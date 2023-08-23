import { AuthState, authStateReducer, effectsAuth } from '@state/auth';
import { HouseState, effectsHouse, reducerHouseState } from '@state/house';
import { commonEffects } from './common.effects';
import { effectsPerson } from './person/effects';
import { effectsRoom } from './room/effects';

export interface AppState {
  houseState: HouseState;
  authState: AuthState;
}

export const provideStoreArgs = {
  houseState: reducerHouseState,
  authState: authStateReducer,
};
export const provideEffectArgs = [effectsHouse, effectsAuth, commonEffects, effectsPerson, effectsRoom];
