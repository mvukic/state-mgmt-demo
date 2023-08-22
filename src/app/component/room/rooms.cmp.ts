import { CdkDropList } from '@angular/cdk/drag-drop';
import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { actionsRoom, selectorsRoomState } from 'src/app/state/room';
import { RoomCmp } from './room.cmp';
import { RoomPeopleCmp } from './room.people';

@Component({
  selector: 'rooms-cmp',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkDropList, NgForOf, RoomCmp, RoomPeopleCmp],
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <button (click)="add()">Add</button>
      <ul>
        <li *ngFor="let room of vm()">
          <room-cmp [room]="room" />
          <room-people [people]="room.people" [roomId]="room.id" />
        </li>
      </ul>
    </div>
  `,
})
export class RoomsCmp {
  #store = inject(Store);

  #data = this.#store.selectSignal(selectorsRoomState.selectRoomsViews);
  vm = computed(() => this.#data());

  add() {
    const n = Math.floor(Math.random() * 100);
    this.#store.dispatch(actionsRoom.create({ name: `some room name ${n}`, designation: `designation ${n}` }));
  }
}
