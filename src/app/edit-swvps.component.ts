import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PO, SWVP } from './model/models';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { NgForOf } from '@angular/common';
import { actionsSWVP } from './state/mo/swvp/actions';
import { selectSWVPs } from './state/mo/swvp/selector';
import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDragExit, CdkDropList } from '@angular/cdk/drag-drop';
import { CommonFilterComponent } from './filter.component';

@Component({
  selector: 'edit-swvps',
  standalone: true,
  imports: [LetModule, NgForOf, ReactiveFormsModule, CdkDropList, CommonFilterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div style="display: flex">
        <common-filter placeholder="Filter SWVPs" label="Filter query" (query)="filter.query$.next($event)" />
        <fieldset style="width: 170px">
          <legend>Choose sorting direction</legend>
          <input type="radio" name="sort-dir" id="up" (click)="sort.direction$.next('UP')" checked />
          <label for="up">Up</label>
          <input type="radio" name="sort-dir" id="down" (click)="sort.direction$.next('DOWN')" />
          <label for="down">Down</label>
        </fieldset>
        <fieldset style="width: 170px">
          <legend>Choose sorting property</legend>
          <input type="radio" name="sort-prop" id="name" (click)="sort.property$.next('name')" checked />
          <label for="name">Name</label>
          <input type="radio" name="sort-prop" id="description" disabled />
          <label for="description">Description</label>
        </fieldset>
      </div>
      <div *ngrxLet="{ vm: vm$ } as vm">
        <!-- Buttons-->
        <button (click)="add()">Add</button>

        <!-- Content-->
        <ul>
          <li *ngFor="let pair of vm.vm.data">
            <button (click)="delete(pair.swvp.id)">Delete</button>
            <span>{{ pair.swvp.id }}</span>
            <button [disabled]="pair.form.invalid || pair.form.pristine" (click)="update(pair)">Update</button>
            <form [formGroup]="pair.form">
              <input type="text" formControlName="name" />
            </form>
            <ul
              cdkDropList
              [cdkDropListData]="pair.swvp.pos"
              (cdkDropListEntered)="onEnter($event)"
              (cdkDropListExited)="onExit($event)"
              (cdkDropListDropped)="onDrop($event)"
              [cdkDropListEnterPredicate]="onEnterPredicate()"
              style="min-height: 50px; border: 1px solid black"
            >
              <li *ngFor="let po of pair.swvp.pos">
                <span>{{ po.id }} - {{ po.name }}</span>
                <button (click)="removePO(pair.swvp.id, po.id)">Remove</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class EditSWVPsComponent {
  #store = inject(Store);

  /* Holds filter data */
  filter = getFilter();
  /* Holds sort data */
  sort = getSort();

  /* Observes different data streams: the data itself, filtering data, sorting data */
  vm$ = combineLatest([this.#store.select(selectSWVPs), this.filter.$, this.sort.$]).pipe(
    map(([items, filter, sort]) => prepareData(items, filter, sort))
  );

  add() {
    const n = Math.floor(Math.random() * 100);
    this.#store.dispatch(actionsSWVP.create({ name: `some swvp name ${n}` }));
  }

  delete(swvpId: string) {
    this.#store.dispatch(actionsSWVP.delete({ swvpId }));
  }

  update(swvp: ViewModelPair) {
    const update = { ...swvp.swvp, ...swvp.form.value };
    this.#store.dispatch(actionsSWVP.update(update));
  }

  removePO(swvpId: string, poId: string) {
    this.#store.dispatch(actionsSWVP.remove_po({ swvpId, poId }));
  }

  onEnterPredicate() {
    return (drag: CdkDrag<string>, drop: CdkDropList<PO>) => {
      // console.log('Enter predicate', drag, drop);
      return true;
    };
  }

  onDrop(event: CdkDragDrop<PO[], PO[], string>) {
    console.log('Drop', event);
  }

  onEnter(event: CdkDragEnter<PO[]>) {
    console.log('Enter', event);
  }

  onExit(event: CdkDragExit<PO[]>) {
    console.log('Exit', event);
  }
}

function getFilter(query = '') {
  const query$ = new BehaviorSubject(query);
  return {
    query,
    query$,
    /* Observes filter data */
    $: query$.pipe(map((query) => ({ query }))),
  };
}

function getSort() {
  const direction$ = new BehaviorSubject<'UP' | 'DOWN'>('UP');
  const property$ = new BehaviorSubject<'name'>('name');
  return {
    direction$,
    property$,
    /* Observes sort data */
    $: combineLatest([direction$, property$]).pipe(map(([direction, property]) => ({ direction, property }))),
  };
}

function prepareData(swvps: SWVP[], filter: FilterType, sort: SortType): ViewModel {
  return buildViewModel(sortFn(filterFn(swvps, filter), sort));
}

function buildViewModel(swvps: SWVP[]): ViewModel {
  const fb = new FormBuilder().nonNullable;
  return {
    data: swvps.map((swvp) => ({
      swvp,
      form: fb.group({
        name: fb.control(swvp.name, [Validators.required]),
      }),
    })),
  };
}

function filterFn(items: SWVP[], { query }: FilterType): SWVP[] {
  if (query.length === 0) {
    return items;
  }
  return items.filter((item) => item.name.includes(query) || item.name.includes(query));
}

function sortFn(swvps: SWVP[], { direction, property }: SortType): SWVP[] {
  const order = direction == 'UP' ? -1 : 1;
  return [...swvps].sort((a, b) => order * a[property].localeCompare(b[property]));
}

type ViewModelPair = {
  swvp: SWVP;
  form: FormGroup<{ name: FormControl<string> }>;
};

type ViewModel = {
  data: ViewModelPair[];
};

type SortType = {
  direction: 'UP' | 'DOWN';
  property: 'name';
};

type FilterType = {
  query: string;
};
