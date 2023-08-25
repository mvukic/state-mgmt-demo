import { ActionCreator, ReducerTypes, on } from '@ngrx/store';
import { actionsAuth } from '@state/auth';
import { HouseState, actionsHouse, initialHouseState } from '@state/house';

// prettier-ignore
export const houseReducers: ReducerTypes<HouseState, readonly ActionCreator[]>[] = [
  on(actionsHouse.set, (state, { id, name }): HouseState => ({ ...state, house: { id, name }, isSet: true })),
  on(actionsHouse.close, () => ({ ...initialHouseState() })),
  on(actionsHouse.updateSuccess, (state, { name }): HouseState => ({ ...state, house: { ...state.house, name } })),
  on(actionsAuth.logout, () => ({ ...initialHouseState() })),
];
