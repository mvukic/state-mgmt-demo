import { createReducer, on } from '@ngrx/store';
import { initialHouseState } from './state';
import { actionsHouse } from './actions';
import { actionsRoom } from './room/actions';
import { insertItem, removeItem, updateItem } from '../generic';
import {
  addPersonToRoom,
  getRandomPerson,
  removePersonFromRoom,
  removePersonFromRooms,
  updatePersonInRoom,
} from './room/utils';
import { actionsPerson } from './person/actions';

export const moStateReducer = createReducer(
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
  on(actionsPerson.update, (state, po) => ({
    ...state,
    people: updateItem(state.people, po),
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
  on(actionsRoom.update, (state, swvp) => ({
    ...state,
    rooms: updateItem(state.rooms, swvp),
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
