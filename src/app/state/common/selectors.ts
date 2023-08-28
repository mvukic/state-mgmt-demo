import { createSelector } from '@ngrx/store';
import { AppState } from '@state/state';

const commonState = (state: AppState) => state.common;

// Export public selectors
export const selectCommonState = {
  selectCommon: createSelector(commonState, (state) => state.common),
};
