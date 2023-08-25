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
  on(actionsHouse.set, (state, { id, name }): HouseState => ({ ...state, house: { id, name }, isSet: true }) ),
  on(actionsHouse.updateSuccess, (state, { name }): HouseState => ({ ...state, house: { ...state.house, name } }) ),
  on(actionsHouse.close, () => ({ ...initialHouseState() })),
  on(actionsAuth.logout, () => ({ ...initialHouseState() })),
  // Person related reducers
  on(actionsPerson.createSuccess, (state, { firstName, lastName }): HouseState => addPerson(state, firstName, lastName)),
  on(actionsPerson.updateSuccess, (state, { id, firstName, lastName }): HouseState => updatePerson(state, id, firstName, lastName)),
  on(actionsPerson.set, (state, { people }): HouseState => initializePeople(state, people)),
  on(actionsPerson.deleteSuccess, (state, { id }): HouseState => deletePerson(state, id)),
  // Room related reducers
  on(actionsRoom.createSuccess, (state, { name, designation }): HouseState => addRoom(state, name, designation)),
  on(actionsRoom.set, (state, { rooms }): HouseState => initializeRooms(state, rooms)),
  on(actionsRoom.updateSuccess,(state, { id, name, designation }): HouseState => updateRoom(state, id, name, designation)),
  on(actionsRoom.deleteSuccess, (state, { id }): HouseState => deleteRoom(state, id)),
  on(actionsRoom.removePersonSuccess, (state, { roomId, personId }): HouseState => removePersonFromRoom(state, roomId, personId)),
  on(actionsRoom.addPersonSuccess, (state, { roomId, personId }): HouseState => addPersonToRoom(state, roomId, personId)),
);
