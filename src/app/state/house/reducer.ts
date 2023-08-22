import { createReducer, on } from '@ngrx/store';
import { actionsAuth } from '@state/auth';
import { addPerson, deletePerson, initializePeople, updatePerson } from '@state/person/utils';
import { actionsPerson } from 'src/app/state/person';
import {
    actionsRoom,
    addPersonToRoom,
    addRoom,
    deleteRoom,
    initializeRooms,
    removePersonFromRoom,
    updateRoom,
} from 'src/app/state/room';
import { actionsHouse } from './actions';
import { HouseState, initialHouseState } from './state';

export const reducerHouseState = createReducer(
  initialHouseState(),
  // House related reducers
  on(actionsHouse.set, (state, { id, name }): HouseState => ({ ...state, house: { id, name }, viewed: true }) ),
  on(actionsHouse.update, (state, { name }): HouseState => ({ ...state, house: { ...state.house, name } }) ),
  on(actionsHouse.close, () => ({ ...initialHouseState() })),
  on(actionsAuth.logout, () => ({ ...initialHouseState() })),
  // Person related reducers
  on(actionsPerson.create, (state, { firstName, lastName }): HouseState => addPerson(state, firstName, lastName)),
  on(actionsPerson.update, (state, { personId, firstName, lastName }): HouseState => updatePerson(state, personId, firstName, lastName)),
  on(actionsPerson.set, (state, { people }): HouseState => initializePeople(state, people)),
  on(actionsPerson.delete, (state, { personId }): HouseState => deletePerson(state, personId)),
  // Room related reducers
  on(actionsRoom.create, (state, { name, designation }): HouseState => addRoom(state, name, designation)),
  on(actionsRoom.set, (state, { rooms }): HouseState => initializeRooms(state, rooms)),
  on(actionsRoom.update,(state, { roomId, name, designation }): HouseState => updateRoom(state, roomId, name, designation)),
  on(actionsRoom.delete, (state, { roomId }): HouseState => deleteRoom(state, roomId)),
  on(actionsRoom.removePerson, (state, { roomId, personId }): HouseState => removePersonFromRoom(state, roomId, personId)),
  on(actionsRoom.addPerson, (state, { roomId, personId }): HouseState => addPersonToRoom(state, roomId, personId)),
);
