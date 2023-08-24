import { RoomView } from '@domain/room/model';
import { createSelector } from '@ngrx/store';
import { selectPersonState } from '@state/person';
import { roomEntityAdapter } from '@state/room/state';
import { AppState } from '@state/state';

// Get room selectors from top level state
const { selectAll } = roomEntityAdapter.getSelectors((state: AppState) => state.houseState.rooms);

const selectRoomsViews = createSelector(
  // Get all rooms
  selectAll,
  // Get all people as dictionary
  selectPersonState.entities,
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
  all: createSelector(selectAll, (rooms) => rooms),
  views: selectRoomsViews,
};
