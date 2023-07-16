import { createSelector } from '@ngrx/store';
import { HouseState } from '@state/house';
import { roomEntityAdapter } from '@state/room/state';

const { selectAll } = roomEntityAdapter.getSelectors();

export const selectRooms = createSelector(
  (state: HouseState) => state.rooms,
  (state) => selectAll(state),
);
