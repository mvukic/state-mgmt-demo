import { createSelector } from '@ngrx/store';
import { AppState } from '@state';

const houseState = (state: AppState) => state.houseState;

// Export public selectors
export const selectHouseState = {
  selectHouse: createSelector(houseState, (state) => state.house),
  selectIsSet: createSelector(houseState, (state) => state.isSet),
};
