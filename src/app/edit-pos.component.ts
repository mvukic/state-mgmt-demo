import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PO } from './model/models';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { NgForOf } from '@angular/common';
import { selectPOs } from './state/mo/po/selector';
import { actionsPO } from './state/mo/po/actions';
import { CommonFilterComponent } from './filter.component';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'edit-pos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LetModule, NgForOf, ReactiveFormsModule, CommonFilterComponent, CdkDropList, CdkDrag],
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div style="display: flex">
        <common-filter
          placeholder="Filter POs"
          label="Filter query"
          [value]="filter.getQuery()"
          (query)="filter.setQuery($event)"
        />
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
          <input type="radio" name="sort-prop" id="description" (click)="sort.setProperty('description')" />
          <label for="description">Description</label>
        </fieldset>
      </div>
      <div *ngrxLet="{ vm: vm$ } as vm">
        <span>Count: {{ vm.vm.data.length }}</span> <br />
        <!-- Buttons-->
        <button (click)="add()">Add</button>

        <!-- Content-->
        <ul cdkDropList cdkDropListSortingDisabled>
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
  filter = new FilterClass();
  /* Holds sort data */
  sort = new SortClass();

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

class FilterClass {
  #query$ = new BehaviorSubject('');

  $: Observable<FilterType> = this.#query$.pipe(map((query) => ({ query })));

  constructor(query = '') {
    this.setQuery(query);
  }

  getQuery() {
    return this.#query$.getValue();
  }

  setQuery(value: string) {
    this.#query$.next(value);
  }
}

class SortClass {
  #direction$ = new BehaviorSubject<'UP' | 'DOWN'>('UP');
  #property$ = new BehaviorSubject<'name' | 'description'>('name');

  $: Observable<SortType> = combineLatest([this.#direction$, this.#property$]).pipe(
    map(([direction, property]) => ({ direction, property }))
  );

  constructor(direction: 'UP' | 'DOWN' = 'UP', property: 'name' | 'description' = 'name') {
    this.setDirection(direction);
    this.setProperty(property);
  }

  getDirection() {
    return this.#direction$.getValue();
  }
  setDirection(value: 'UP' | 'DOWN') {
    this.#direction$.next(value);
  }

  getProperty() {
    return this.#property$.getValue();
  }
  setProperty(value: 'name' | 'description') {
    this.#property$.next(value);
  }
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
