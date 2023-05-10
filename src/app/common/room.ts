import { Room } from '../model/models';

function filterByQuery(rooms: Room[], query?: string): Room[] {
  if (query === undefined || query.trim().length === 0) {
    return rooms;
  }
  return rooms.filter((room) => isFilteredByQuery(room, query));
}

function isFilteredByQuery(room: Room, query?: string): boolean {
  if (query === undefined || query.trim().length === 0) {
    return true;
  }
  return room.name.indexOf(query) > -1 || room.designation.indexOf(query) > -1;
}

function filterByHasPeople(rooms: Room[], hasPeople?: boolean): Room[] {
  if (hasPeople === undefined) {
    return rooms;
  }
  return rooms.filter((item) => isFilteredByHasPeople(item, hasPeople));
}

function isFilteredByHasPeople(item: Room, hasPeople: boolean): boolean {
  return (!(item.people.length > 0) && !hasPeople) || (item.people.length > 0 && hasPeople);
}

export const filterRoom = {
  filterByQuery,
  isFilteredByQuery,
  filterByHasPeople,
  isFilteredByHasPeople,
};

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

export const sortRoom = {
  sortByAttribute,
  compareByAttribute,
  sortByHasPeople,
  compareByHasPeople,
};
