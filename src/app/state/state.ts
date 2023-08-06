import { AuthState, authEffects, authStateReducer } from '@state/auth';
import { HouseState, houseEffects, houseStateReducer } from '@state/house';
import { personEffects } from '@state/person';

export interface AppState {
  houseState: HouseState;
  authState: AuthState;
}

export const provideStoreArgs = {
  houseState: houseStateReducer,
  authState: authStateReducer,
};
export const provideEffectArgs = [houseEffects, personEffects, authEffects];
