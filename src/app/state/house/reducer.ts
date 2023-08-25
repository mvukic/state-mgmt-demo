import { createReducer } from '@ngrx/store';
import { personEvents } from '@state/person';
import { roomReducers } from '@state/room';
import { houseReducers } from './reducers';
import { initialHouseState } from './state';

// prettier-ignore
export const reducerHouseState = createReducer(
  initialHouseState(),
  ...houseReducers,
  ...personEvents,
  ...roomReducers,
);
