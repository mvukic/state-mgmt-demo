import { createSelector } from '@ngrx/store';
import { AppState } from '@state';

const houseState = (state: AppState) => state.houseState;

// Export public selectors
export const selectHouseState = {
  house: createSelector(houseState, (state) => state.house),
  isSet: createSelector(houseState, (state) => state.isSet),
};
