import { createReducer } from '@ngrx/store';
import { personReducers } from '@state/house/person';
import { roomReducers } from '@state/house/room';
import { houseReducers } from './reducers';
import { initialHouseState } from './state';

// prettier-ignore
export const reducerHouseState = createReducer(
  initialHouseState(),
  ...houseReducers,
  ...personReducers,
  ...roomReducers,
);
