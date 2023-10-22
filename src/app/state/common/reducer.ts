import { createReducer, on } from '@ngrx/store';
import { actionsCommon } from './actions';
import { CommonState, initialCommonState } from './state';

export const commonStateReducer = createReducer(
  initialCommonState(),
  // common reducers
  on(actionsCommon.set, (state, { data }): CommonState => ({ ...state, data })),
);
