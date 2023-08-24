import { createSelector } from '@ngrx/store';
import { AppState } from '@state/state';

const commonState = (state: AppState) => state.commonState;

// Export public selectors
export const selectCommonState = {
  config: createSelector(commonState, (state) => state.config),
  constants: createSelector(commonState, (state) => state.constants),
};
