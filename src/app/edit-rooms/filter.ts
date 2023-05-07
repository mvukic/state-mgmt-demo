import { Room } from '../model/models';
import { filterRoom } from '../common/room';
import { Signal, computed, signal } from '@angular/core';

export type RoomFilterType = {
  query?: string;
  hasPeople?: boolean;
  logic: boolean;
};

export type RoomFilterOptions = {
  query?: string;
  hasPeople?: boolean;
  logic?: boolean;
};

export class RoomsFilter {
  readonly query = signal<string | undefined>(undefined);
  readonly hasPeople = signal<boolean | undefined>(undefined);
  readonly logic = signal<boolean>(true);

  value: Signal<RoomFilterType> = computed(() => {
    return { query: this.query(), hasPeople: this.hasPeople(), logic: this.logic() };
  });

  constructor(options?: RoomFilterOptions) {
    this.query.set(options?.query);
    this.hasPeople.set(options?.hasPeople);
    if (options?.logic !== undefined) {
      this.logic.set(options.logic);
    }
  }
}

export function filterRooms(rooms: Room[], options: RoomFilterType): Room[] {
  const { logic, ...filters } = options;
  // If no filters are defined the just return the items
  if (Object.values(filters).every((v) => v === undefined)) {
    return rooms;
  }

  const { query, hasPeople } = filters;
  const and = () => {
    let filtered = rooms;
    if (query != undefined) {
      filtered = filterRoom.filterByQuery(filtered, query);
    }
    if (hasPeople != undefined) {
      filtered = filterRoom.filterByHasPeople(filtered, hasPeople);
    }
    return filtered;
  };
  const or = () => {
    return rooms.filter((room) => {
      let flag = false;
      // TODO: this does not work
      if (query != undefined) {
        flag ||= filterRoom.isFilteredByQuery(room, query);
      }
      if (hasPeople != undefined) {
        flag ||= filterRoom.isFilteredByHasPeople(room, hasPeople);
      }
      return flag;
    });
  };

  return logic ? and() : or();
}
