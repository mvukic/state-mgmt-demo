import { createReducer, on } from '@ngrx/store';
import { HouseState, initialHouseState } from './state';
import { actionsHouse } from './actions';
import {
  actionsRoom,
  addPersonToRoom,
  addRoom,
  deleteRoom,
  initializeRooms,
  removePersonFromRoom,
  updateRoom,
} from 'src/app/state/room';
import { personActions } from 'src/app/state/person';
import { addPerson, deletePerson, initializePeople, updatePerson } from '@state/person/utils';

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
  on(personActions.create, (state, { firstName, lastName }): HouseState => addPerson(state, firstName, lastName)),
  on(
    personActions.update,
    (state, { personId, firstName, lastName }): HouseState => updatePerson(state, personId, firstName, lastName),
  ),
  on(personActions.init, (state, { people }): HouseState => initializePeople(state, people)),
  on(personActions.delete, (state, { personId }): HouseState => deletePerson(state, personId)),
  on(actionsRoom.create, (state, { name, designation }): HouseState => addRoom(state, name, designation)),
  on(actionsRoom.init, (state, { rooms }): HouseState => initializeRooms(state, rooms)),
  on(
    actionsRoom.update,
    (state, { roomId, name, designation }): HouseState => updateRoom(state, roomId, name, designation),
  ),
  on(actionsRoom.delete, (state, { roomId }): HouseState => deleteRoom(state, roomId)),
  on(
    actionsRoom.removePerson,
    (state, { roomId, personId }): HouseState => removePersonFromRoom(state, roomId, personId),
  ),
  on(actionsRoom.addPerson, (state, { roomId, personId }): HouseState => addPersonToRoom(state, roomId, personId)),
);
