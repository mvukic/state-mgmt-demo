import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PO } from './model/models';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { NgForOf } from '@angular/common';
import { selectPOs } from './state/mo/po/selector';
import { actionsPO } from './state/mo/po/actions';
import { CommonFilterComponent } from './filter.component';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'edit-pos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [LetModule, NgForOf, ReactiveFormsModule, CommonFilterComponent, CdkDropList, CdkDrag],
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div style="display: flex">
        <common-filter
          placeholder="Filter POs"
          label="Filter query"
          [value]="filter.query"
          (query)="filter.query$.next($event)"
        />
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
          <input type="radio" name="sort-prop" id="description" (click)="sort.property$.next('description')" />
          <label for="description">Description</label>
        </fieldset>
      </div>
      <div *ngrxLet="{ vm: vm$ } as vm">
        <span>Count: {{ vm.vm.data.length }}</span> <br />
        <!-- Buttons-->
        <button (click)="add()">Add</button>

        <!-- Content-->
        <ul cdkDropList>
          <li *ngFor="let pair of vm.vm.data">
            <button (click)="delete(pair.po.id)">Delete</button>
            <span cdkDrag [cdkDragData]="pair.po.id">{{ pair.po.id }}</span>
            <button [disabled]="pair.form.invalid || pair.form.pristine" (click)="update(pair)">Update</button>
            <form [formGroup]="pair.form">
              <input formControlName="name" />
              <input formControlName="description" />
            </form>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class EditPOsComponent {
  #store = inject(Store);

  /* Holds filter data */
  filter = getFilter();
  /* Holds sort data */
  sort = getSort();

  /* Observes different data streams: the data itself, filtering data, sorting data */
  vm$ = combineLatest([this.#store.select(selectPOs), this.filter.$, this.sort.$]).pipe(
    map(([items, filter, sort]) => prepareData(items, filter, sort))
  );

  add() {
    const n1 = Math.floor(Math.random() * 100);
    const n2 = Math.floor(Math.random() * 100);
    this.#store.dispatch(actionsPO.create({ name: `some po name ${n1}`, description: `some po description ${n2}` }));
  }

  delete(poId: string) {
    this.#store.dispatch(actionsPO.delete({ poId }));
  }

  update(pair: ViewModelPair) {
    const update = { ...pair.po, ...pair.form.value };
    this.#store.dispatch(actionsPO.update(update));
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
  const property$ = new BehaviorSubject<'name' | 'description'>('name');
  return {
    direction$,
    property$,
    /* Observes sort data */
    $: combineLatest([direction$, property$]).pipe(map(([direction, property]) => ({ direction, property }))),
  };
}

function prepareData(pos: PO[], filter: FilterType, sort: SortType): ViewModel {
  return buildViewModel(sortFn(filterFn(pos, filter), sort));
}

function buildViewModel(pos: PO[]): ViewModel {
  const fb = new FormBuilder().nonNullable;
  return {
    data: pos.map((po) => ({
      po,
      form: fb.group({
        name: fb.control(po.name, [Validators.required]),
        description: fb.control(po.description, [Validators.required]),
      }),
    })),
  };
}

function filterFn(items: PO[], { query }: FilterType): PO[] {
  if (query.length === 0) {
    return items;
  }
  return items.filter((item) => item.name.includes(query) || item.description.includes(query));
}

function sortFn(items: PO[], { direction, property }: SortType): PO[] {
  const order = direction == 'UP' ? 1 : -1;
  return items.slice().sort((a, b) => order * a[property].localeCompare(b[property]));
}

type ViewModelPair = {
  po: PO;
  form: FormGroup<{ name: FormControl<string>; description: FormControl<string> }>;
};

type ViewModel = {
  data: ViewModelPair[];
};

type SortType = {
  direction: 'UP' | 'DOWN';
  property: 'name' | 'description';
};

type FilterType = {
  query: string;
};
