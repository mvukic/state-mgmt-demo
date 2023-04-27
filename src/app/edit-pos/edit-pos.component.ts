import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PO } from '../model/models';
import { combineLatest, map } from 'rxjs';
import { NgForOf } from '@angular/common';
import { selectPOs } from '../state/mo/po/selector';
import { actionsPO } from '../state/mo/po/actions';
import { CommonFilterComponent } from '../filter.component';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { PoFilter, PoFilterType, filterPos } from './filter';
import { PoSort, PoSortType, sortPos } from './sort';

@Component({
  selector: 'edit-pos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LetModule, NgForOf, ReactiveFormsModule, CommonFilterComponent, CdkDropList, CdkDrag],
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div style="display: flex">
        <common-query-filter
          placeholder="Filter POs"
          label="Filter query"
          [value]="filter.getQuery()"
          (query)="filter.setQuery($event)"
        />
        <fieldset style="width: 170px">
          <legend>Choose sorting property</legend>
          <input type="radio" name="sort-prop" id="po-name" (click)="sort.setProperty('name')" checked />
          <label for="name">Name</label>
          <input type="radio" name="sort-prop" id="po-designation" (click)="sort.setProperty('designation')" />
          <label for="designation">Designation</label>
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

  /* Observes different data streams: the data itself, filtering data, sorting data */
  vm$ = combineLatest([this.#store.select(selectPOs), this.filter.$, this.sort.$]).pipe(
    map(([items, filter, sort]) => buildViewModel(items, filter, sort))
  );

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

function buildViewModel(items: PO[], filter: PoFilterType, sort: PoSortType): ViewModel {
  // Filter POs by using composable filter functions
  const filtered = filterPos(items, filter);

  // Sort POs by using composable sort functions
  const sorted = sortPos(filtered, sort);
  console.log(sorted);

  const fb = new FormBuilder().nonNullable;
  return {
    data: sorted.map((po) => ({
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
