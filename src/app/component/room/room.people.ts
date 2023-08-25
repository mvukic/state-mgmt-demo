import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject, signal } from '@angular/core';
import { Person, PersonView } from '@domain/person/model';
import { Store } from '@ngrx/store';
import { actionsRoom } from '@state/house/room';

@Component({
  selector: 'room-people',
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
      [class.allow-drop]="dropAllowed()"
      (cdkDropListEntered)="dropAllowed.set(true)"
      (cdkDropListExited)="dropAllowed.set(false)"
      (cdkDropListDropped)="onDrop($event)"
      [cdkDropListEnterPredicate]="onEnterPredicate()"
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
  dropAllowed = signal(false);

  /* Parent room id */
  @Input({ required: true })
  roomId!: string;

  /* People in the room */
  @Input({ required: true })
  people: PersonView[] = [];

  onDrop(event: CdkDragDrop<Person[], Person[], string>) {
    if (!event.isPointerOverContainer) {
      return;
    }
    this.#store.dispatch(actionsRoom.addPerson({ roomId: this.roomId, personId: event.item.data }));
  }

  remove(personId: string) {
    this.#store.dispatch(actionsRoom.removePerson({ roomId: this.roomId, personId }));
  }

  onEnterPredicate() {
    return (drag: CdkDrag<string>) => {
      return this.people.every((p) => p.id !== drag.data);
    };
  }
}
