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
import { FilterClass, FilterType } from './filter';
import { SortClass, SortType } from './sort';
import { filterPO, sortPO } from '../common/po';

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
    map(([items, filter, sort]) => buildViewModel(items, filter, sort))
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

function buildViewModel(pos: PO[], filter: FilterType, sort: SortType): ViewModel {
  const filtered = filterPO.filterByQuery(pos, filter.query);
  const sorted = sortPO.sortByProperty(filtered, sort.property);

  const fb = new FormBuilder().nonNullable;
  return {
    data: sorted.map((po) => ({
      po,
      form: fb.group({
        name: fb.control(po.name, [Validators.required]),
        description: fb.control(po.description, [Validators.required]),
      }),
    })),
  };
}

export type ViewModelPair = {
  po: PO;
  form: FormGroup<{ name: FormControl<string>; description: FormControl<string> }>;
};

export type ViewModel = {
  data: ViewModelPair[];
};
