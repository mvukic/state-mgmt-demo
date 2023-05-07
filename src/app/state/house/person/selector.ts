import { createSelector } from '@ngrx/store';
import { selectHouseState } from '../selectors';

export const selectPeople = createSelector(selectHouseState, (state) => state.people);
