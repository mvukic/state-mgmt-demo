import { createSelector } from '@ngrx/store';
import { selectHouseState } from '../selectors';

export const selectRooms = createSelector(selectHouseState, (state) => state.rooms);
