import { ActionCreator, ReducerTypes, on } from '@ngrx/store';
import { actionsGlobal } from '@state/actions';
import { actionsAuth } from '@state/auth';
import { HouseState, actionsHouse, initialHouseState } from '@state/house';

// prettier-ignore
export const houseReducers: ReducerTypes<HouseState, readonly ActionCreator[]>[] = [
  on(actionsHouse.set, (state, { id, name }): HouseState => ({ ...state, house: { id, name }, isSet: true })),
  on(actionsHouse.close, () => ({ ...initialHouseState() })),
  on(actionsHouse.load, (state) => ({ ...state, loading: true })),
  on(actionsHouse.updateSuccess, (state, { name }): HouseState => ({ ...state, house: { ...state.house, name }, loading: false })),
  on(actionsGlobal.failure, (state) => ({ ...state, loading: false })),
  on(actionsAuth.logout, () => ({ ...initialHouseState() })),
];
