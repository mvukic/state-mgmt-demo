import { Person } from '@domain/person/model';
import { Room, RoomStateUpdate } from '@domain/room/model';
import { HouseState } from '@state/house';

export function updateRoom(rooms: Room[], update: RoomStateUpdate): Room[] {
  return rooms.map((item) => {
    if (item.id !== update.id) {
      return item;
    }

    return {
      ...item,
      ...update,
    };
  });
}

export function removePersonFromRoom(state: HouseState, roomId: string, personId: string): Room[] {
  return state.rooms.map((room) => {
    if (room.id !== roomId) {
      return room;
    }
    return {
      ...room,
      people: room.people.filter((id) => id !== personId),
    };
  });
}

export function removePersonFromRooms(state: HouseState, personId: string): Room[] {
  return state.rooms.map((room) => {
    return {
      ...room,
      people: room.people.filter((id) => id !== personId),
    };
  });
}

export function addPersonToRoom(state: HouseState, roomId: string, personId: string): Room[] {
  return state.rooms.map((room) => {
    if (room.id !== roomId) {
      return room;
    }

    return {
      ...room,
      people: [...room.people, personId],
    };
  });
}

export function getRandomPerson(people: Person[]) {
  if (people.length === 0) {
    return [];
  }
  const index = Math.floor(Math.random() * people.length);
  return [structuredClone(people[index])].map((person) => person.id);
}
