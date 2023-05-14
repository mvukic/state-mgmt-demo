import { Room } from '@domain/room/model';
import { RoomFilterType } from './filter';

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

function filter(rooms: Room[], options: RoomFilterType): Room[] {
  const { logic, ...filters } = options;
  // If no filters are defined the just return the items
  if (Object.values(filters).every((v) => v === undefined)) {
    return rooms;
  }

  const { query, hasPeople } = filters;
  const and = () => {
    let filtered = rooms;
    if (query != undefined) {
      filtered = filterRoomFns.filterByQuery(filtered, query);
    }
    if (hasPeople != undefined) {
      filtered = filterRoomFns.filterByHasPeople(filtered, hasPeople);
    }
    return filtered;
  };
  const or = () => {
    return rooms.filter((room) => {
      let flag = false;
      // TODO: this does not work
      if (query != undefined) {
        flag ||= filterRoomFns.isFilteredByQuery(room, query);
      }
      if (hasPeople != undefined) {
        flag ||= filterRoomFns.isFilteredByHasPeople(room, hasPeople);
      }
      return flag;
    });
  };

  return logic ? and() : or();
}

export const filterRoomFns = {
  filterByQuery,
  isFilteredByQuery,
  filterByHasPeople,
  isFilteredByHasPeople,
  filter,
};
