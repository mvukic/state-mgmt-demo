import { createSelector } from '@ngrx/store';
import { selectMOState } from '../selectors';

export const selectSWVPs = createSelector(selectMOState, (state) => state.swvps);
