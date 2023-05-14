import { createReducer, on } from '@ngrx/store';
import { initialHouseState } from './state';
import { actionsHouse } from './actions';
import { actionsRoom } from '@state/house/room';
import { insertItem, removeItem, updateItem } from '@state/utils';
import {
  addPersonToRoom,
  getRandomPerson,
  removePersonFromRoom,
  removePersonFromRooms,
  updatePersonInRoom,
} from '@state/house/room';
import { actionsPerson } from '@state/house/person';

export const houseStateReducer = createReducer(
  initialHouseState(),
  on(actionsHouse.create, (state, { name }) => ({
    ...state,
    house: { id: crypto.randomUUID(), name },
    viewed: true,
  })),
  on(actionsHouse.init, (state, mo) => ({
    ...state,
    house: { id: mo.id, name: mo.name },
    viewed: true,
  })),
  on(actionsHouse.update, (state, { name }) => ({
    ...state,
    house: { ...state.house, name },
  })),
  on(actionsHouse.close, () => ({
    ...initialHouseState(),
  })),
  on(actionsPerson.create, (state, { firstName, lastName }) => ({
    ...state,
    people: insertItem(state.people, { id: crypto.randomUUID(), firstName, lastName }),
  })),
  on(actionsPerson.update, (state, person) => ({
    ...state,
    people: updateItem(state.people, person),
  })),
  on(actionsPerson.init, (state, { people }) => ({
    ...state,
    people,
  })),
  on(actionsPerson.delete, (state, { personId }) => ({
    ...state,
    people: removeItem(state.people, personId),
    rooms: removePersonFromRooms(state, personId),
  })),
  on(actionsRoom.create, (state, { name, designation }) => ({
    ...state,
    rooms: insertItem(state.rooms, {
      id: crypto.randomUUID(),
      name,
      designation: designation,
      people: getRandomPerson(state.people),
    }),
  })),
  on(actionsRoom.init, (state, { rooms }) => ({
    ...state,
    rooms,
  })),
  on(actionsRoom.update, (state, room) => ({
    ...state,
    rooms: updateItem(state.rooms, room),
  })),
  on(actionsRoom.delete, (state, { roomId }) => ({
    ...state,
    rooms: removeItem(state.rooms, roomId),
  })),
  on(actionsRoom.removePerson, (state, { roomId, personId }) => ({
    ...state,
    rooms: removePersonFromRoom(state, roomId, personId),
  })),
  on(actionsRoom.updatePerson, (state, { personId }) => ({
    ...state,
    rooms: updatePersonInRoom(state.people, state.rooms, personId),
  })),
  on(actionsRoom.addPerson, (state, { roomId, personId }) => ({
    ...state,
    rooms: addPersonToRoom(state.people, state.rooms, roomId, personId),
  }))
);
