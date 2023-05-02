import { ChangeDetectionStrategy, Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PO, SWVP } from '../model/models';
import { NgForOf } from '@angular/common';
import { actionsSWVP } from '../state/mo/swvp/actions';
import { selectSWVPs } from '../state/mo/swvp/selector';
import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDragExit, CdkDropList } from '@angular/cdk/drag-drop';
import { QueryFilterComponent, FilterLogicComponent } from '../filter.component';
import { filterSwvps, SwvpFilter } from './filter';
import { sortSwvps, SwvpSort } from './sort';
import { setupApplyClass } from '../common/di';

@Component({
  selector: 'swvp-property-filter',
  standalone: true,
  template: `
    <fieldset style="width: 170px">
      <legend>Choose sorting property</legend>
      <input
        type="radio"
        name="swvp-sort-prop"
        id="swvp-name"
        (click)="property.next('name')"
        [checked]="value === 'name'"
      />
      <label for="swvp-name">Name</label>
      <input
        type="radio"
        name="swvp-sort-prop"
        id="swvp-designation"
        (click)="property.next('designation')"
        [checked]="value === 'designation'"
      />
      <label for="swvp-designation">Designation</label>
    </fieldset>
  `,
})
export class SwvpSortByPropertyComponent {
  @Input({ required: true })
  value!: 'name' | 'designation' | undefined;

  @Output()
  property = new EventEmitter<'name' | 'designation' | undefined>();
}

@Component({
  selector: 'swvp-has-po-filter',
  standalone: true,
  template: `
    <fieldset style="width: 170px">
      <legend>Has Pos</legend>
      <input
        type="radio"
        name="swvp-filter-has-po"
        id="swvp-has-po-yes"
        (click)="hasPOs.next(true)"
        [checked]="value === true"
      />
      <label for="swvp-has-po-yes">Yes</label>
      <input
        type="radio"
        name="swvp-filter-has-po"
        id="swvp-has-po-no"
        (click)="hasPOs.next(false)"
        [checked]="value === false"
      />
      <label for="swvp-has-po-no">No</label>
      <input
        type="radio"
        name="swvp-filter-has-po"
        id="swvp-has-po-none"
        (click)="hasPOs.next(undefined)"
        [checked]="value === undefined"
      />
      <label for="swvp-has-po-none">None</label>
    </fieldset>
  `,
})
export class SwvpHasPosFilterComponent {
  @Input({ required: true })
  value!: boolean | undefined;

  @Output()
  hasPOs = new EventEmitter<boolean | undefined>();
}

@Component({
  selector: 'edit-swvps',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LetModule,
    NgForOf,
    ReactiveFormsModule,
    CdkDropList,
    QueryFilterComponent,
    FilterLogicComponent,
    SwvpSortByPropertyComponent,
    SwvpHasPosFilterComponent,
  ],
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
          <legend>Filtering</legend>
          <query-filter placeholder="Filter SWVPs" label="Filter query" (query)="filter.query.set($event)" />
          <swvp-has-po-filter [value]="filter.hasPOs()" (hasPOs)="filter.hasPOs.set($event)" />
          <query-filter-logic [value]="filter.logic()" (logic)="filter.logic.set($event)" />
        </fieldset>
        <fieldset>
          <legend>Sorting</legend>
          <swvp-property-filter [value]="sort.property()" (property)="sort.property.set($event)" />
        </fieldset>
      </div>
      <div>
        <!-- Buttons-->
        <button (click)="add()">Add</button>

        <!-- Content-->
        <ul>
          <li *ngFor="let pair of vm().data">
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
  vm = computed(() => {
    const data = this.#store.selectSignal(selectSWVPs);
    const filtered = filterSwvps(data(), this.filter.value());
    const sorted = sortSwvps(filtered, this.sort.value());
    return buildViewModel(sorted);
  });

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
    this.#store.dispatch(actionsSWVP.remove_PO({ swvpId, poId }));
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
    this.#store.dispatch(actionsSWVP.add_PO({ swvpId, poId }));
  }
  onEnter(event: CdkDragEnter<PO[]>) {
    this.#applyClass.addClass(event.container.element);
  }

  onExit(event: CdkDragExit<PO[]>) {
    this.#applyClass.removeClass(event.container.element);
  }
}

function buildViewModel(items: SWVP[]): ViewModel {
  const fb = new FormBuilder().nonNullable;
  return {
    data: items.map((swvp) => ({
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
  form: FormGroup<{ name: FormControl<string>; designation: FormControl<string> }>;
};

type ViewModel = {
  data: ViewModelPair[];
};
