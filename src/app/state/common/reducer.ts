import { createReducer, on } from '@ngrx/store';
import { actionsCommon } from './actions';
import { CommonState, initialCommonState } from './state';

export const commonStateReducer = createReducer(
  initialCommonState(),
  // common reducers
  on(actionsCommon.setConfig, (state, { api }): CommonState => ({ ...state, config: { ...state.config, api } })),
  on(actionsCommon.setConstants, (state, { constant }): CommonState => ({ ...state, constants: { ...state.constants, constant } })),
);
