import { Room } from '@domain/room/model';
import { RoomSortOptions } from './sort';

function compareByAttribute(a: Room, b: Room, attribute: 'name' | 'designation'): number {
  return a[attribute].localeCompare(b[attribute]);
}

function sortByAttribute(rooms: Room[], attribute: 'name' | 'designation'): Room[] {
  return rooms.slice().sort((a, b) => compareByAttribute(a, b, attribute));
}

function compareByHasPeople(a: Room, b: Room): number {
  return b.people.length - a.people.length;
}

function sortByHasPeople(rooms: Room[], hasPeople: boolean | undefined): Room[] {
  if (hasPeople === undefined) {
    return rooms;
  }
  return rooms.slice().sort((a, b) => compareByHasPeople(a, b));
}

function sort(rooms: Room[], options: RoomSortOptions): Room[] {
  const { attribute, hasPeople } = options;
  return rooms.slice().sort((a, b) => {
    let sortResult = 1;
    if (attribute !== undefined) {
      sortResult ||= sortRoomFns.compareByAttribute(a, b, attribute);
    }
    if (hasPeople !== undefined) {
      sortResult ||= sortRoomFns.compareByHasPeople(a, b);
    }

    return sortResult;
  });
}

export const sortRoomFns = {
  sortByAttribute,
  compareByAttribute,
  sortByHasPeople,
  compareByHasPeople,
  sort,
};
