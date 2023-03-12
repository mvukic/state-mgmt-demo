import { ChangeDetectionStrategy, Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PO, SWVP } from './model/models';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { NgForOf } from '@angular/common';
import { actionsSWVP } from './state/mo/swvp/actions';
import { selectSWVPs } from './state/mo/swvp/selector';
import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDragExit, CdkDropList } from '@angular/cdk/drag-drop';
import { CommonFilterComponent } from './filter.component';

function setupApplyClass(cssClass: string) {
  const renderer = inject(Renderer2);

  return {
    addClass: (element: ElementRef) => {
      renderer.addClass(element.nativeElement, cssClass);
    },
    removeClass: (element: ElementRef) => {
      renderer.removeClass(element.nativeElement, cssClass);
    },
  };
}

@Component({
  selector: 'edit-swvps',
  standalone: true,
  imports: [LetModule, NgForOf, ReactiveFormsModule, CdkDropList, CommonFilterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .swvp-pos-container {
        min-height: 50px;
        border: 1px solid black;
        &.allow-drop {
          border-color: green;
        }
      }
    `,
  ],
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div style="display: flex">
        <common-filter placeholder="Filter SWVPs" label="Filter query" (query)="filter.setQuery($event)" />
        <fieldset style="width: 170px">
          <legend>Choose sorting direction</legend>
          <input type="radio" name="sort-dir" id="up" (click)="sort.setDirection('UP')" checked />
          <label for="up">Up</label>
          <input type="radio" name="sort-dir" id="down" (click)="sort.setDirection('DOWN')" />
          <label for="down">Down</label>
        </fieldset>
        <fieldset style="width: 170px">
          <legend>Choose sorting property</legend>
          <input type="radio" name="sort-prop" id="name" (click)="sort.setProperty('name')" checked />
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
              (cdkDropListDropped)="onDrop($event, pair.swvp)"
              [cdkDropListEnterPredicate]="onEnterPredicate"
              class="swvp-pos-container"
              style=""
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
  #applyClass = setupApplyClass('allow-drop');

  /* Holds filter data */
  filter = new FilterClass();
  /* Holds sort data */
  sort = new SortClass();

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

  onEnterPredicate(drag: CdkDrag<string>, drop: CdkDropList<PO[]>) {
    return drop.data.every((po) => po.id !== drag.data);
  }

  onDrop(event: CdkDragDrop<PO[], PO[], string>, swvp: SWVP) {
    if (!event.isPointerOverContainer) {
      return;
    }
    this.#applyClass.removeClass(event.container.element);
    const poId = event.item.data;
    const swvpId = swvp.id;
    this.#store.dispatch(actionsSWVP.add_po({ swvpId, poId }));
  }
  onEnter(event: CdkDragEnter<PO[]>) {
    this.#applyClass.addClass(event.container.element);
  }

  onExit(event: CdkDragExit<PO[]>) {
    this.#applyClass.removeClass(event.container.element);
  }
}

class FilterClass {
  #query$ = new BehaviorSubject('');

  $: Observable<FilterType> = this.#query$.pipe(map((query) => ({ query })));

  setQuery(value: string) {
    this.#query$.next(value);
  }
}

class SortClass {
  #direction$ = new BehaviorSubject<'UP' | 'DOWN'>('UP');
  #property$ = new BehaviorSubject<'name'>('name');

  $: Observable<SortType> = combineLatest([this.#direction$, this.#property$]).pipe(
    map(([direction, property]) => ({ direction, property }))
  );

  constructor(direction: 'UP' | 'DOWN' = 'UP', property: 'name' = 'name') {
    this.setDirection(direction);
    this.setProperty(property);
  }

  setDirection(value: 'UP' | 'DOWN') {
    this.#direction$.next(value);
  }

  setProperty(value: 'name') {
    this.#property$.next(value);
  }
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
