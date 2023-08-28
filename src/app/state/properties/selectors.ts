import { createSelector } from '@ngrx/store';
import { AppState } from '@state/state';

const propertiesState = (state: AppState) => state.propertiesState;

// Export public selectors
export const selectPropertiesState = {
  selectConfig: createSelector(propertiesState, (state) => state.config),
  selectConstants: createSelector(propertiesState, (state) => state.constants),
};
