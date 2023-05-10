import { ChangeDetectionStrategy, Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person, Room } from '../model/models';
import { NgForOf } from '@angular/common';
import { actionsRoom } from '../state/house/room/actions';
import { selectRooms } from '../state/house/room/selector';
import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDragExit, CdkDropList } from '@angular/cdk/drag-drop';
import { QueryFilterComponent, FilterLogicComponent } from '../filter.component';
import { filterRooms, RoomsFilter } from './filter';
import { sortRooms, RoomSort } from './sort';
import { setupApplyClass } from '../common/di';

@Component({
  selector: 'room-attribute-filter',
  standalone: true,
  template: `
    <fieldset style="width: 170px">
      <legend>Choose sorting attribute</legend>
      <input
        type="radio"
        name="room-sort-prop"
        id="room-name"
        (click)="attribute.next('name')"
        [checked]="value === 'name'"
      />
      <label for="room-name">Name</label>
      <input
        type="radio"
        name="room-sort-prop"
        id="room-designation"
        (click)="attribute.next('designation')"
        [checked]="value === 'designation'"
      />
      <label for="room-designation">Designation</label>
    </fieldset>
  `,
})
export class RoomSortByAttributeComponent {
  @Input({ required: true })
  value!: 'name' | 'designation' | undefined;

  @Output()
  attribute = new EventEmitter<'name' | 'designation' | undefined>();
}

@Component({
  selector: 'room-has-people-filter',
  standalone: true,
  template: `
    <fieldset style="width: 170px">
      <legend>Has people</legend>
      <input
        type="radio"
        name="room-filter-has-people"
        id="room-has-people-yes"
        (click)="hasPeople.next(true)"
        [checked]="value === true"
      />
      <label for="room-has-people-yes">Yes</label>
      <input
        type="radio"
        name="room-filter-has-people"
        id="room-has-people-no"
        (click)="hasPeople.next(false)"
        [checked]="value === false"
      />
      <label for="room-has-people-no">No</label>
      <input
        type="radio"
        name="room-filter-has-people"
        id="room-has-people-none"
        (click)="hasPeople.next(undefined)"
        [checked]="value === undefined"
      />
      <label for="room-has-people-none">None</label>
    </fieldset>
  `,
})
export class RoomHasPosFilterComponent {
  @Input({ required: true })
  value!: boolean | undefined;

  @Output()
  hasPeople = new EventEmitter<boolean | undefined>();
}

@Component({
  selector: 'edit-rooms',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    CdkDropList,
    QueryFilterComponent,
    FilterLogicComponent,
    RoomSortByAttributeComponent,
    RoomHasPosFilterComponent,
  ],
  styles: [
    `
      .room-people-container {
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
          <query-filter placeholder="Filter rooms" label="Filter query" (query)="filter.query.set($event)" />
          <room-has-people-filter [value]="filter.hasPeople()" (hasPeople)="filter.hasPeople.set($event)" />
          <query-filter-logic [value]="filter.logic()" (logic)="filter.logic.set($event)" />
        </fieldset>
        <fieldset>
          <legend>Sorting</legend>
          <room-attribute-filter [value]="sort.attribute()" (attribute)="sort.attribute.set($event)" />
        </fieldset>
      </div>
      <div>
        <!-- Buttons-->
        <button (click)="add()">Add</button>

        <!-- Content-->
        <ul>
          <li *ngFor="let pair of vm().data">
            <button (click)="delete(pair.room.id)">Delete</button>
            <span>{{ pair.room.id }}</span>
            <button [disabled]="pair.form.invalid || pair.form.pristine" (click)="update(pair)">Update</button>
            <form [formGroup]="pair.form">
              <input type="text" formControlName="name" />
              <input type="text" formControlName="designation" />
            </form>
            <ul
              cdkDropList
              [cdkDropListData]="pair.room.people"
              (cdkDropListEntered)="onEnter($event)"
              (cdkDropListExited)="onExit($event)"
              (cdkDropListDropped)="onDrop($event, pair.room)"
              [cdkDropListEnterPredicate]="onEnterPredicate"
              class="room-people-container"
            >
              <li *ngFor="let person of pair.room.people">
                <span>{{ person.id }} - {{ person.firstName }}</span>
                <button (click)="removePerson(pair.room.id, person.id)">Remove</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class EditRoomsComponent {
  #store = inject(Store);
  #applyClass = setupApplyClass('allow-drop');

  /* Holds filter data */
  filter = new RoomsFilter();
  /* Holds sort data */
  sort = new RoomSort({ attribute: 'designation' });

  /* Observes different data streams: the data itself, filtering data, sorting data */
  #data = this.#store.selectSignal(selectRooms);
  vm = computed(() => {
    const data = this.#data();
    const filtered = filterRooms(data, this.filter.value());
    const sorted = sortRooms(filtered, this.sort.value());
    return buildViewModel(sorted);
  });

  add() {
    const n = Math.floor(Math.random() * 100);
    this.#store.dispatch(actionsRoom.create({ name: `some room name ${n}`, designation: `designation ${n}` }));
  }

  delete(roomId: string) {
    this.#store.dispatch(actionsRoom.delete({ roomId }));
  }

  update(room: ViewModelPair) {
    const update = { ...room.room, ...room.form.value };
    this.#store.dispatch(actionsRoom.update(update));
  }

  removePerson(roomId: string, personId: string) {
    this.#store.dispatch(actionsRoom.removePerson({ roomId, personId }));
  }

  onEnterPredicate(drag: CdkDrag<string>, drop: CdkDropList<Person[]>) {
    return drop.data.every((person) => person.id !== drag.data);
  }

  onDrop(event: CdkDragDrop<Person[], Person[], string>, room: Room) {
    if (!event.isPointerOverContainer) {
      return;
    }
    this.#applyClass.removeClass(event.container.element);
    const personId = event.item.data;
    const roomId = room.id;
    this.#store.dispatch(actionsRoom.addPerson({ roomId, personId }));
  }
  onEnter(event: CdkDragEnter<Person[]>) {
    this.#applyClass.addClass(event.container.element);
  }

  onExit(event: CdkDragExit<Person[]>) {
    this.#applyClass.removeClass(event.container.element);
  }
}

function buildViewModel(items: Room[]): ViewModel {
  const fb = new FormBuilder().nonNullable;
  return {
    data: items.map((room) => ({
      room,
      form: fb.group({
        name: fb.control(room.name, [Validators.required]),
        designation: fb.control(room.designation, [Validators.required]),
      }),
    })),
  };
}

type ViewModelPair = {
  room: Room;
  form: FormGroup<{ name: FormControl<string>; designation: FormControl<string> }>;
};

type ViewModel = {
  data: ViewModelPair[];
};
