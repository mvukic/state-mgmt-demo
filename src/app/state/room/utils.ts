import { Room } from '@domain/room/model';
import { HouseState } from '@state/house';
import { roomEntityAdapter } from '@state/room/state';
import { EntityMap, EntityMapOne } from '@ngrx/entity';

export function initializeRooms(state: HouseState, rooms: Room[]): HouseState {
  // Set room entity state to new values
  const update = roomEntityAdapter.setAll(rooms, state.rooms);
  return { ...state, rooms: update };
}

export function addRoom(state: HouseState, name: string, designation: string): HouseState {
  // Crate new room
  const room: Room = { id: crypto.randomUUID(), name, designation, people: [] };
  // Save it into room entity state
  const update = roomEntityAdapter.addOne(room, state.rooms);
  // Return updated house state
  return { ...state, rooms: update };
}

export function updateRoom(state: HouseState, roomId: string, name: string, designation: string): HouseState {
  // Update some properties on specific room entity
  const update = roomEntityAdapter.updateOne({ id: roomId, changes: { name, designation } }, state.rooms);
  // Return updated house state
  return { ...state, rooms: update };
}

export function deleteRoom(state: HouseState, roomId: string): HouseState {
  // Delete specific person entity
  const update = roomEntityAdapter.removeOne(roomId, state.rooms);
  // Return updated house state
  return { ...state, rooms: update };
}

export function addPersonToRoom(state: HouseState, roomId: string, personId: string): HouseState {
  // Create a mapper for a single room entity to add new person id
  const mapper: EntityMapOne<Room> = {
    id: roomId,
    map: (room) => ({ ...room, people: [...room.people, personId] }),
  };
  const update = roomEntityAdapter.mapOne(mapper, state.rooms);
  return { ...state, rooms: update };
}

export function removePersonFromRoom(state: HouseState, roomId: string, personId: string): HouseState {
  // Create a mapper for a single room entity to remove person id
  const mapper: EntityMapOne<Room> = {
    id: roomId,
    map: (room) => ({ ...room, people: room.people.filter((id) => id !== personId) }),
  };
  const update = roomEntityAdapter.mapOne(mapper, state.rooms);
  return { ...state, rooms: update };
}

export function removePersonFromRooms(state: HouseState, personId: string): HouseState {
  // Create a mapper for a single room entity to remove person id
  const mapper: EntityMap<Room> = (room) => ({ ...room, people: room.people.filter((id) => id !== personId) });
  const update = roomEntityAdapter.map(mapper, state.rooms);
  return { ...state, rooms: update };
}
