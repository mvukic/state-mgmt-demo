import { createSelector } from '@ngrx/store';
import { AppState } from '@state';

const selectHouseState = (state: AppState) => state.houseState;

// Export public selectors
export const selectorsHouseState = {
  selectHouse: createSelector(selectHouseState, (state) => state.house),
  selectIsSet: createSelector(selectHouseState, (state) => state.isSet),
};
