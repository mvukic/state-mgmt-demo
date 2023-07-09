import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForOf } from '@angular/common';
import { selectRooms } from 'src/app/state/room';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { filterRoomFns, RoomsFilter } from '@domain/room/filter';
import { RoomSort, sortRoomFns } from '@domain/room/sort';
import { FilterLogicComponent, QueryFilterComponent } from '@common/component';
import { RoomSortByAttributeOptionsCmp } from './room.sort-by-attribute.options';
import { RoomHasPeopleFilterOptionsCmp } from './room.has-people.options';
import { RoomsListCmp } from './rooms.list';

@Component({
  selector: 'edit-rooms',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RoomHasPeopleFilterOptionsCmp,
    RoomSortByAttributeOptionsCmp,
    QueryFilterComponent,
    FilterLogicComponent,
    RoomsListCmp,
    CdkDropList,
    NgForOf,
  ],
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div style="display: flex">
        <fieldset>
          <legend>Filtering</legend>
          <query-filter placeholder="Filter rooms" label="Filter query" (query)="filter.query.set($event)" />
          <room-filter-has-people-options [value]="filter.hasPeople()" (hasPeople)="filter.hasPeople.set($event)" />
          <query-filter-logic [value]="filter.logic()" (logic)="filter.logic.set($event)" />
        </fieldset>
        <fieldset>
          <legend>Sorting</legend>
          <room-sort-by-attribute-options [value]="sort.attribute()" (attribute)="sort.attribute.set($event)" />
        </fieldset>
      </div>
      <rooms-list [rooms]="vm()" />
    </div>
  `,
})
export class RoomsEditCmp {
  #store = inject(Store);

  /* Holds filter data */
  filter = new RoomsFilter();
  /* Holds sort data */
  sort = new RoomSort({ attribute: 'designation' });

  /* Observes different data streams: the data itself, filtering data, sorting data */
  #data = this.#store.selectSignal(selectRooms);
  vm = computed(() => {
    const data = this.#data();
    return sortRoomFns.sort(filterRoomFns.filter(data, this.filter.value()), this.sort.value());
  });
}
