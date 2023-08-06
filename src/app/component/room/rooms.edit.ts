import { CdkDropList } from '@angular/cdk/drag-drop';
import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRooms } from 'src/app/state/room';
import { RoomsListCmp } from './rooms.list';

@Component({
  selector: 'edit-rooms',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RoomsListCmp,
    CdkDropList,
    NgForOf,
  ],
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <rooms-list [rooms]="vm()" />
    </div>
  `,
})
export class RoomsEditCmp {
  #store = inject(Store);

  /* Observes different data streams: the data itself, filtering data, sorting data */
  #data = this.#store.selectSignal(selectRooms);
  vm = computed(() => this.#data());
}
