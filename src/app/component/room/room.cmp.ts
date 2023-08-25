import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cloneTransform } from '@common/fn/transforms';
import { RoomView } from '@domain/room/model';
import { Store } from '@ngrx/store';
import { actionsRoom } from '@state/room';

@Component({
  selector: 'room-cmp',
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
  room!: RoomView;

  delete() {
    this.#store.dispatch(actionsRoom.delete({ id: this.room.id }));
  }

  update() {
    this.#store.dispatch(
      actionsRoom.update({ id: this.room.id, name: this.room.name, designation: this.room.designation }),
    );
  }
}
