import { Room } from '@domain/room/model';
import { EntityMap, EntityMapOne } from '@ngrx/entity';
import { HouseState } from '@state/house';
import { roomEntityAdapter } from '@state/house/room/state';

export function initializeRooms(state: HouseState, rooms: Room[]): HouseState {
  // Set room entity state to new values
  return { ...state, rooms: roomEntityAdapter.setAll(rooms, state.rooms) };
}

export function addRoom(state: HouseState, name: string, designation: string): HouseState {
  // Crate new room
  const room: Room = { id: crypto.randomUUID(), name, designation, peopleIds: [] };
  // Save it into room entity state
  return { ...state, rooms: roomEntityAdapter.addOne(room, state.rooms) };
}

export function updateRoom(state: HouseState, roomId: string, name: string, designation: string): HouseState {
  // Update some properties on specific room entity
  return { ...state, rooms: roomEntityAdapter.updateOne({ id: roomId, changes: { name, designation } }, state.rooms) };
}

export function deleteRoom(state: HouseState, roomId: string): HouseState {
  // Delete specific person entity
  return { ...state, rooms: roomEntityAdapter.removeOne(roomId, state.rooms) };
}

export function addPersonToRoom(state: HouseState, roomId: string, personId: string): HouseState {
  // Create a mapper for a single room entity to add new person id
  const mapper: EntityMapOne<Room> = {
    id: roomId,
    map: (room) => ({ ...room, peopleIds: [...room.peopleIds, personId] }),
  };
  return { ...state, rooms: roomEntityAdapter.mapOne(mapper, state.rooms) };
}

export function removePersonFromRoom(state: HouseState, roomId: string, personId: string): HouseState {
  // Create a mapper for a single room entity to remove person id
  const mapper: EntityMapOne<Room> = {
    id: roomId,
    map: (room) => ({ ...room, peopleIds: room.peopleIds.filter((id) => id !== personId) }),
  };
  return { ...state, rooms: roomEntityAdapter.mapOne(mapper, state.rooms) };
}

export function removePersonFromRooms(state: HouseState, personId: string): HouseState {
  // Create a mapper for a single room entity to remove person id
  const mapper: EntityMap<Room> = (room) => ({ ...room, people: room.peopleIds.filter((id) => id !== personId) });
  return { ...state, rooms: roomEntityAdapter.map(mapper, state.rooms) };
}
