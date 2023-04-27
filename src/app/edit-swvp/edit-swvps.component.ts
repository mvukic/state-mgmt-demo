import { ChangeDetectionStrategy, Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PO, SWVP } from '../model/models';
import { combineLatest, map } from 'rxjs';
import { NgForOf } from '@angular/common';
import { actionsSWVP } from '../state/mo/swvp/actions';
import { selectSWVPs } from '../state/mo/swvp/selector';
import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDragExit, CdkDropList } from '@angular/cdk/drag-drop';
import { CommonFilterComponent } from '../filter.component';
import { filterSwvps, SwvpFilter, SwvpFilterType } from './filter';
import { sortSwvps, SwvpSort, SwvpSortType } from './sort';
import { setupApplyClass } from '../common/di';

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
        <fieldset>
          <legend>Filter</legend>
          <common-query-filter placeholder="Filter SWVPs" label="Filter query" (query)="filter.setQuery($event)" />
          <fieldset>
            <legend>Filter logic</legend>
            <input
              type="radio"
              name="swvp-filter-logic"
              id="swvp-filter-logic-and"
              (click)="filter.setLogic(false)"
            />
            <label for="swvp-filter-logic-and">And</label>
            <input
              type="radio"
              name="swvp-filter-logic"
              id="swvp-filter-logic-or"
              (click)="filter.setLogic(true)"
            />
            <label for="swvp-filter-logic-or">Or</label>
          </fieldset>
        </fieldset>

        <fieldset>
          <legend>Sorting</legend>
          <fieldset style="width: 170px">
            <legend>Choose sorting property</legend>
            <input type="radio" name="sort-prop" id="swvp-name" (click)="sort.setProperty('name')" checked />
            <label for="name">Name</label>
            <input type="radio" name="sort-prop" id="swvp-designation" (click)="sort.setProperty('designation')" />
            <label for="designation">Designation</label>
          </fieldset>
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
              <input type="text" formControlName="designation" />
            </form>
            <ul
              cdkDropList
              [cdkDropListData]="pair.swvp.pos"
              (cdkDropListEntered)="onEnter($event)"
              (cdkDropListExited)="onExit($event)"
              (cdkDropListDropped)="onDrop($event, pair.swvp)"
              [cdkDropListEnterPredicate]="onEnterPredicate"
              class="swvp-pos-container"
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
  filter = new SwvpFilter();
  /* Holds sort data */
  sort = new SwvpSort({ property: 'designation' });

  /* Observes different data streams: the data itself, filtering data, sorting data */
  vm$ = combineLatest([this.#store.select(selectSWVPs), this.filter.$, this.sort.$]).pipe(
    map(([items, filter, sort]) => buildViewModel(items, filter, sort))
  );

  add() {
    const n = Math.floor(Math.random() * 100);
    this.#store.dispatch(actionsSWVP.create({ name: `some swvp name ${n}`, designation: `designation ${n}` }));
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

function buildViewModel(swvps: SWVP[], filter: SwvpFilterType, sort: SwvpSortType): ViewModel {
  // Filter SWVPs by using composable filter functions
  const filtered = filterSwvps(swvps, filter);

  // Sort SWVPs by using composable sort functions
  const sorted = sortSwvps(filtered, sort);

  const fb = new FormBuilder().nonNullable;
  return {
    data: sorted.map((swvp) => ({
      swvp,
      form: fb.group({
        name: fb.control(swvp.name, [Validators.required]),
        designation: fb.control(swvp.designation, [Validators.required]),
      }),
    })),
  };
}

type ViewModelPair = {
  swvp: SWVP;
  form: FormGroup<{ name: FormControl<string>, designation: FormControl<string> }>;
};

type ViewModel = {
  data: ViewModelPair[];
};
