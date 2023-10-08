import { RoomView } from '@domain/room/model';
import { createSelector } from '@ngrx/store';
import { selectPersonState } from '@state/house/person';
import { roomEntityAdapter } from '@state/house/room/state';
import { HouseState } from '../state';

// Get room selectors from top level state
const { selectAll } = roomEntityAdapter.getSelectors((state: { house: HouseState }) => state.house.rooms);

const selectRoomsViews = createSelector(
  // Get all rooms
  selectAll,
  // Get all people as dictionary
  selectPersonState.selectEntities,
  (rooms, people) =>
    rooms.map(
      (room) =>
        ({
          id: room.id,
          name: room.name,
          designation: room.designation,
          people: room.peopleIds.map((id) => people[id]).filter(Boolean),
        }) as RoomView,
    ),
);

// Export public selectors
export const selectRoomState = {
  selectRooms: createSelector(selectAll, (rooms) => rooms),
  views: selectRoomsViews,
};
