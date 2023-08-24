import { AuthState, authStateReducer, effectsAuth } from '@state/auth';
import { HouseState, effectsHouse, reducerHouseState } from '@state/house';
import { commonEffects } from './common/effects';
import { commonStateReducer } from './common/reducer';
import { CommonState } from './common/state';
import { effectsPerson } from './person/effects';
import { effectsRoom } from './room/effects';

export interface AppState {
  houseState: HouseState;
  authState: AuthState;
  commonState: CommonState;
}

export const provideStoreArgs = {
  houseState: reducerHouseState,
  authState: authStateReducer,
  commonState: commonStateReducer,
};
export const provideEffectArgs = [effectsHouse, effectsAuth, commonEffects, effectsPerson, effectsRoom];
