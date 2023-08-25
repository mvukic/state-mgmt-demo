import { createReducer } from '@ngrx/store';
import { personReducers } from '@state/person';
import { roomReducers } from '@state/room';
import { houseReducers } from './reducers';
import { initialHouseState } from './state';

// prettier-ignore
export const reducerHouseState = createReducer(
  initialHouseState(),
  ...houseReducers,
  ...personReducers,
  ...roomReducers,
);
