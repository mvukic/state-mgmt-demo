import { createSelector } from '@ngrx/store';
import { selectMOState } from '../selectors';

export const selectPOs = createSelector(selectMOState, (state) => state.pos);
