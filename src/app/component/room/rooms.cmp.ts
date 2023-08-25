import { CdkDropList } from '@angular/cdk/drag-drop';
import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { actionsRoom, selectRoomState } from '@state/house/room';
import { RoomCmp } from './room.cmp';
import { RoomPeopleCmp } from './room.people';

@Component({
  selector: 'rooms-cmp',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkDropList, NgForOf, RoomCmp, RoomPeopleCmp],
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div>
        <span>Count: {{ vm().length }}</span> <br />
        <!-- Buttons-->
        <button (click)="add()">Add</button>

        <!-- Content-->
        <ul>
          <li *ngFor="let room of vm()">
            <room-cmp [room]="room" />
            <room-people [people]="room.people" [roomId]="room.id" />
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class RoomsCmp {
  #store = inject(Store);

  vm = this.#store.selectSignal(selectRoomState.views);

  add() {
    const n = Math.floor(Math.random() * 100);
    this.#store.dispatch(actionsRoom.create({ name: `some room name ${n}`, designation: `designation ${n}` }));
  }
}
