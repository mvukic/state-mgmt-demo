import { createSelector } from '@ngrx/store';
import { selectHouseState } from '../house/selectors';

export const selectRooms = createSelector(selectHouseState, (state) => state.rooms);
