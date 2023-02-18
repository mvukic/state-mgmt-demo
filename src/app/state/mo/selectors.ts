import { AppState } from '../state';
import { createSelector } from '@ngrx/store';

export const selectMOState = (state: AppState) => state.moState;

export const selectIsOpened = createSelector(
  selectMOState,
  (state) => state.opened
);

export const selectMO = createSelector(selectMOState, (state) => state.mo);

export const selectPOs = createSelector(selectMOState, (state) => state.pos);

export const selectSWVPs = createSelector(
  selectMOState,
  (state) => state.swvps
);
