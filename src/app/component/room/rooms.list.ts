import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { Room } from '@domain/room/model';
import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDragExit, CdkDropList } from '@angular/cdk/drag-drop';
import { NgForOf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { actionsRoom } from 'src/app/state/room';
import { Person } from '@domain/person/model';
import { Store } from '@ngrx/store';
import { setupApplyClass } from '@common/fn/di';
import { cloneTransform } from '@common/fn/transforms';
import { selectPeopleByIds } from '@state/person';

@Component({
  selector: 'room-people-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkDropList, NgForOf],
  styles: [
    `
      ul {
        min-height: 50px;
        border: 1px solid black;
        &.allow-drop {
          border-color: green;
        }
      }
    `,
  ],
  template: `
    <ul
      cdkDropList
      (cdkDropListEntered)="onEnter($event)"
      (cdkDropListExited)="onExit($event)"
      (cdkDropListDropped)="onDrop($event)"
      [cdkDropListEnterPredicate]="onEnterPredicate"
    >
      <li *ngFor="let person of _people()">
        <span>{{ person.id }} - {{ person.firstName }}</span>
        <button (click)="remove(person.id)">Remove</button>
      </li>
    </ul>
  `,
})
export class RoomPeopleCmp {
  #store = inject(Store);
  #applyClass = setupApplyClass('allow-drop');

  /* Parent room id */
  @Input({ required: true })
  roomId!: string;

  /* Ids of the people in the room */
  @Input({ required: true })
  set people(ids: string[]) {
    this._ids.set(ids);
  }

  /* Ids of the people in the room */
  _ids = signal<string[]>([]);
  _people = this.#store.selectSignal(selectPeopleByIds(this._ids()));

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
    this.#applyClass.addClass(event.container.element);
  }

  onExit(event: CdkDragExit<Person[]>) {
    this.#applyClass.removeClass(event.container.element);
  }

  remove(personId: string) {
    const roomId = this.roomId;
    this.#store.dispatch(actionsRoom.removePerson({ roomId, personId }));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEnterPredicate(drag: CdkDrag<string>, _: CdkDropList<Person[]>) {
    return !this._ids().includes(drag.data);
  }
}

@Component({
  selector: 'room-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
    <button (click)="delete()">Delete</button>
    <span>{{ room.id }}</span>
    <button [disabled]="form.invalid || form.pristine" (click)="update()">Update</button>
    <form #form="ngForm">
      <input [(ngModel)]="room.name" name="name" required />
      <input [(ngModel)]="room.designation" name="designation" required />
    </form>
  `,
})
export class RoomCmp {
  #store = inject(Store);

  @Input({ required: true, transform: cloneTransform })
  room!: Room;

  delete() {
    this.#store.dispatch(actionsRoom.delete({ roomId: this.room.id }));
  }

  update() {
    this.#store.dispatch(
      actionsRoom.update({ roomId: this.room.id, name: this.room.name, designation: this.room.designation }),
    );
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
      <li *ngFor="let room of _rooms()">
        <room-item [room]="room" />
        <room-people-list [people]="room.people" [roomId]="room.id" />
      </li>
    </ul>
  `,
})
export class RoomsListCmp {
  #store = inject(Store);

  @Input()
  set rooms(rooms: Room[]) {
    this._rooms.set(rooms);
  }

  _rooms = signal<Room[]>([]);

  add() {
    const n = Math.floor(Math.random() * 100);
    this.#store.dispatch(actionsRoom.create({ name: `some room name ${n}`, designation: `designation ${n}` }));
  }
}
