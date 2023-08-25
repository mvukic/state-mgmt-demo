import { ActionCreator, ReducerTypes, on } from '@ngrx/store';
import { HouseState } from '@state/house';
import { actionsRoom } from './actions';
import { addPersonToRoom, addRoom, deleteRoom, initializeRooms, removePersonFromRoom, updateRoom } from './utils';

// prettier-ignore
export const roomReducers: ReducerTypes<HouseState, readonly ActionCreator[]>[] = [
    on(actionsRoom.set, (state, { rooms }): HouseState => initializeRooms(state, rooms)),
    on(actionsRoom.createSuccess, (state, { name, designation }): HouseState => addRoom(state, name, designation)),
    on(actionsRoom.updateSuccess,(state, { id, name, designation }): HouseState => updateRoom(state, id, name, designation)),
    on(actionsRoom.deleteSuccess, (state, { id }): HouseState => deleteRoom(state, id)),
    on(actionsRoom.removePersonSuccess, (state, { roomId, personId }): HouseState => removePersonFromRoom(state, roomId, personId)),
    on(actionsRoom.addPersonSuccess, (state, { roomId, personId }): HouseState => addPersonToRoom(state, roomId, personId)),
];
