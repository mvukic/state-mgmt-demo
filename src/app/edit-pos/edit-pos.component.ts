import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PO } from '../model/models';
import { NgForOf } from '@angular/common';
import { selectPOs } from '../state/mo/po/selector';
import { actionsPO } from '../state/mo/po/actions';
import { QueryFilterComponent, FilterLogicComponent } from '../filter.component';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { PoFilter, filterPos } from './filter';
import { PoSort, sortPos } from './sort';

@Component({
  selector: 'po-property-filter',
  standalone: true,
  imports: [NgForOf],
  template: `
    <fieldset style="width: 170px">
      <legend>Choose sorting property</legend>
      <input
        type="radio"
        name="po-sort-prop"
        id="po-name"
        (click)="property.next('name')"
        [checked]="value === 'name'"
      />
      <label for="po-name">Name</label>
      <input
        type="radio"
        name="po-sort-prop"
        id="po-designation"
        (click)="property.next('designation')"
        [checked]="value === 'designation'"
      />
      <label for="po-designation">Designation</label>
    </fieldset>
  `,
})
export class PoSortByPropertyComponent {
  @Input({ required: true })
  value!: 'name' | 'designation' | undefined;

  @Output()
  property = new EventEmitter<'name' | 'designation' | undefined>();
}

@Component({
  selector: 'edit-pos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LetModule,
    NgForOf,
    ReactiveFormsModule,
    QueryFilterComponent,
    CdkDropList,
    CdkDrag,
    FilterLogicComponent,
    PoSortByPropertyComponent,
  ],
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div style="display: flex">
        <fieldset>
          <legend>Filtering</legend>
          <query-filter
            placeholder="Filter POs"
            label="Filter query"
            [value]="filter.query()"
            (query)="filter.query.set($event)"
          />
          <query-filter-logic [value]="filter.logic()" (logic)="filter.logic.set($event)" />
        </fieldset>

        <fieldset style="width: 170px">
          <legend>Sorting</legend>
          <po-property-filter [value]="sort.property()" (property)="sort.property.set($event)" />
        </fieldset>
      </div>
      <div>
        <span>Count: {{ vm().data.length }}</span> <br />
        <!-- Buttons-->
        <button (click)="add()">Add</button>

        <!-- Content-->
        <ul cdkDropList cdkDropListSortingDisabled>
          <li *ngFor="let pair of vm().data">
            <button (click)="delete(pair.po.id)">Delete</button>
            <span cdkDrag [cdkDragData]="pair.po.id">{{ pair.po.id }}</span>
            <button [disabled]="pair.form.invalid || pair.form.pristine" (click)="update(pair)">Update</button>
            <form [formGroup]="pair.form">
              <input formControlName="name" />
              <input formControlName="designation" />
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
  filter = new PoFilter();
  /* Holds sort data */
  sort = new PoSort({ property: 'name' });

  /* Observes different data signals: the data itself, filtering data, sorting data */
  #data = this.#store.selectSignal(selectPOs);
  vm = computed(() => {
    const data = this.#data();
    const filtered = filterPos(data, this.filter.value());
    const sorted = sortPos(filtered, this.sort.value());
    return buildViewModel(sorted);
  });

  add() {
    const n1 = Math.floor(Math.random() * 100);
    const n2 = Math.floor(Math.random() * 100);
    this.#store.dispatch(actionsPO.create({ name: `some po name ${n1}`, designation: `some po designation ${n2}` }));
  }

  delete(poId: string) {
    this.#store.dispatch(actionsPO.delete({ poId }));
  }

  update(pair: ViewModelPair) {
    const update = { ...pair.po, ...pair.form.value };
    this.#store.dispatch(actionsPO.update(update));
  }
}

function buildViewModel(items: PO[]): ViewModel {
  const fb = new FormBuilder().nonNullable;
  return {
    data: items.map((po) => ({
      po,
      form: fb.group({
        name: fb.control(po.name, [Validators.required]),
        designation: fb.control(po.designation, [Validators.required]),
      }),
    })),
  };
}

export type ViewModelPair = {
  po: PO;
  form: FormGroup<{ name: FormControl<string>; designation: FormControl<string> }>;
};

export type ViewModel = {
  data: ViewModelPair[];
};
