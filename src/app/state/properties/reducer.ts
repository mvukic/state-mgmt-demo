import { createReducer, on } from '@ngrx/store';
import { actionsProperties } from './actions';
import { PropertiesState, initialPropertiesState } from './state';

export const propertiesStateReducer = createReducer(
  initialPropertiesState(),
  // common reducers
  on(actionsProperties.setConfig, (state, { api }): PropertiesState => ({ ...state, config: { ...state.config, api } })),
  on(actionsProperties.setConstants, (state, { constant }): PropertiesState => ({ ...state, constants: { ...state.constants, constant } })),
);
