import { Room } from '../model/models';
import { sortRoom } from '../common/room';
import { Signal, computed, signal } from '@angular/core';

export type RoomSortType = {
  attribute?: 'name' | 'designation';
  hasPeople?: boolean;
};

export type RoomSortOptions = {
  attribute?: 'name' | 'designation';
  hasPeople?: boolean;
};

export class RoomSort {
  readonly attribute = signal<'name' | 'designation' | undefined>(undefined);
  readonly hasPeople = signal<boolean | undefined>(undefined);

  value: Signal<RoomSortType> = computed(() => {
    return { property: this.attribute(), hasPeople: this.hasPeople() };
  });

  constructor(options?: RoomSortOptions) {
    this.attribute.set(options?.attribute);
    this.hasPeople.set(options?.hasPeople);
  }
}

export function sortRooms(rooms: Room[], options: RoomSortOptions): Room[] {
  const { attribute, hasPeople } = options;
  return rooms.slice().sort((a, b) => {
    let sortResult = 1;
    if (attribute !== undefined) {
      sortResult ||= sortRoom.compareByAttribute(a, b, attribute);
    }
    if (hasPeople !== undefined) {
      sortResult ||= sortRoom.compareByHasPeople(a, b);
    }

    return sortResult;
  });
}
