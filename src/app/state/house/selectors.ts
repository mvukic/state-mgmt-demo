import { AppState } from '../state';
import { createSelector } from '@ngrx/store';

export const selectHouseState = (state: AppState) => state.houseState;

export const selectIsViewed = createSelector(selectHouseState, (state) => state.viewed);

export const selectHouse = createSelector(selectHouseState, (state) => state.house);
