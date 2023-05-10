import { HouseState } from '../state';
import { Person, Room } from '../../../model/models';
import { insertItem, removeItem, updateItem } from '../../generic';

export function removePersonFromRoom(state: HouseState, roomId: string, personId: string): Room[] {
  return state.rooms.map((room) => {
    if (room.id !== roomId) {
      return { ...room };
    }
    return {
      ...room,
      people: removeItem(room.people, personId),
    };
  });
}

export function removePersonFromRooms(state: HouseState, personId: string): Room[] {
  return state.rooms.map((room) => {
    return {
      ...room,
      people: removeItem(room.people, personId),
    };
  });
}

export function updatePersonInRoom(people: Person[], rooms: Room[], id: string): Room[] {
  const person = people.find((person) => person.id === id)!;
  return rooms.map((room) => {
    return {
      ...room,
      people: updateItem(room.people, person),
    };
  });
}

export function addPersonToRoom(people: Person[], rooms: Room[], roomId: string, poId: string): Room[] {
  const person = people.find((person) => person.id === poId)!;
  return rooms.map((room) => {
    if (room.id !== roomId) {
      return room;
    }

    return {
      ...room,
      people: insertItem(room.people, person),
    };
  });
}

export function getRandomPerson(people: Person[]) {
  if (people.length === 0) {
    return [];
  }
  const index = Math.floor(Math.random() * people.length);
  return [structuredClone(people[index])];
}
