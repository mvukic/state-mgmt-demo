import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Room } from '@domain/room/model';
import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDragExit, CdkDropList } from '@angular/cdk/drag-drop';
import { NgForOf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { actionsRoom } from '@state/house/room';
import { Person } from '@domain/person/model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'room-people-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CdkDropList, NgForOf],
  styles: [
    `
      ul {
        min-height: 50px;
        border: 1px solid black;
      }
    `,
  ],
  template: `
    <ul
      cdkDropList
      [cdkDropListData]="people"
      (cdkDropListEntered)="onEnter($event)"
      (cdkDropListExited)="onExit($event)"
      (cdkDropListDropped)="onDrop($event)"
      [cdkDropListEnterPredicate]="onEnterPredicate"
    >
      <li *ngFor="let person of people">
        <span>{{ person.id }} - {{ person.firstName }}</span>
        <button (click)="remove(person.id)">Remove</button>
      </li>
    </ul>
  `,
})
export class RoomPeopleCmp {
  #store = inject(Store);

  @Input()
  roomId!: string;

  @Input({ required: true })
  people: Person[] = [];

  onDrop(event: CdkDragDrop<Person[], Person[], string>) {
    if (!event.isPointerOverContainer) {
      return;
    }
    // this.#applyClass.removeClass(event.container.element);
    const personId = event.item.data;
    const roomId = this.roomId;
    this.#store.dispatch(actionsRoom.addPerson({ roomId, personId }));
  }
  onEnter(event: CdkDragEnter<Person[]>) {
    // this.#applyClass.addClass(event.container.element);
  }

  onExit(event: CdkDragExit<Person[]>) {
    // this.#applyClass.removeClass(event.container.element);
  }

  remove(personId: string) {
    const roomId = this.roomId;
    this.#store.dispatch(actionsRoom.removePerson({ roomId, personId }));
  }

  onEnterPredicate(drag: CdkDrag<string>, drop: CdkDropList<Person[]>) {
    return drop.data.every((person) => person.id !== drag.data);
  }
}

@Component({
  selector: 'room-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <button (click)="delete(_room.id)">Delete</button>
    <span>{{ _room.id }}</span>
    <button [disabled]="_form.invalid || _form.pristine" (click)="update()">Update</button>
    <form [formGroup]="_form">
      <input type="text" formControlName="name" />
      <input type="text" formControlName="designation" />
    </form>
  `,
})
export class RoomCmp {
  #store = inject(Store);
  #fb = inject(FormBuilder).nonNullable;

  _room!: Room;
  _form = this.#fb.group({
    name: this.#fb.control('', [Validators.required]),
    designation: this.#fb.control('', [Validators.required]),
  });

  @Input({ required: true })
  set room(room: Room) {
    this._room = room;
    this._form.patchValue({
      name: room.name,
      designation: room.designation,
    });
  }

  delete(roomId: string) {
    this.#store.dispatch(actionsRoom.delete({ roomId }));
  }

  update() {
    const update = { ...this._room, ...this._form.value };
    this.#store.dispatch(actionsRoom.update(update));
  }
}

@Component({
  selector: 'rooms-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkDropList, NgForOf, ReactiveFormsModule, RoomCmp, RoomPeopleCmp],
  template: `
    <button (click)="add()">Add</button>
    <ul>
      <li *ngFor="let room of rooms">
        <room-item [room]="room" />
        <room-people-list [people]="room.people" />
      </li>
    </ul>
  `,
})
export class RoomsListCmp {
  #store = inject(Store);
  // #applyClass = setupApplyClass('allow-drop');

  @Input()
  rooms: Room[] = [];

  add() {
    const n = Math.floor(Math.random() * 100);
    this.#store.dispatch(actionsRoom.create({ name: `some room name ${n}`, designation: `designation ${n}` }));
  }
}
