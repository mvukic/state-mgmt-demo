import { createReducer, on } from '@ngrx/store';
import { HouseState, initialHouseState } from './state';
import { actionsHouse } from './actions';
import {
  actionsRoom,
  addPersonToRoom,
  getRandomPerson,
  removePersonFromRoom,
  removePersonFromRooms,
  updateRoom,
} from '@state/house/room';
import { insertItem, removeItem, updateItem } from '@state/utils';
import { actionsPerson } from '@state/house/person';

export const houseStateReducer = createReducer(
  initialHouseState(),
  on(
    actionsHouse.create,
    (state, { name }): HouseState => ({
      ...state,
      house: { id: crypto.randomUUID(), name },
      viewed: true,
    }),
  ),
  on(
    actionsHouse.init,
    (state, mo): HouseState => ({
      ...state,
      house: { id: mo.id, name: mo.name },
      viewed: true,
    }),
  ),
  on(
    actionsHouse.update,
    (state, { name }): HouseState => ({
      ...state,
      house: { ...state.house, name },
    }),
  ),
  on(actionsHouse.close, () => ({
    ...initialHouseState(),
  })),
  on(
    actionsPerson.create,
    (state, { firstName, lastName }): HouseState => ({
      ...state,
      people: insertItem(state.people, { id: crypto.randomUUID(), firstName, lastName }),
    }),
  ),
  on(
    actionsPerson.update,
    (state, person): HouseState => ({
      ...state,
      people: updateItem(state.people, person),
    }),
  ),
  on(
    actionsPerson.init,
    (state, { people }): HouseState => ({
      ...state,
      people,
    }),
  ),
  on(
    actionsPerson.delete,
    (state, { personId }): HouseState => ({
      ...state,
      people: removeItem(state.people, personId),
      rooms: removePersonFromRooms(state, personId),
    }),
  ),
  on(
    actionsRoom.create,
    (state, { name, designation }): HouseState => ({
      ...state,
      rooms: insertItem(state.rooms, {
        id: crypto.randomUUID(),
        name,
        designation: designation,
        people: getRandomPerson(state.people),
      }),
    }),
  ),
  on(
    actionsRoom.init,
    (state, { rooms }): HouseState => ({
      ...state,
      rooms,
    }),
  ),
  on(
    actionsRoom.update,
    (state, room): HouseState => ({
      ...state,
      rooms: updateRoom(state.rooms, room),
    }),
  ),
  on(
    actionsRoom.delete,
    (state, { roomId }): HouseState => ({
      ...state,
      rooms: removeItem(state.rooms, roomId),
    }),
  ),
  on(
    actionsRoom.removePerson,
    (state, { roomId, personId }): HouseState => ({
      ...state,
      rooms: removePersonFromRoom(state, roomId, personId),
    }),
  ),
  on(
    actionsRoom.addPerson,
    (state, { roomId, personId }): HouseState => ({
      ...state,
      rooms: addPersonToRoom(state, roomId, personId),
    }),
  ),
);
