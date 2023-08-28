import { AuthState, authStateReducer, effectsAuth } from '@state/auth';
import { HouseState, effectsHouse, reducerHouseState } from '@state/house';
import { CommonState, commonStateReducer } from './common';
import { effectsCommon } from './common/effects';
import { globalEffects } from './effects';
import { effectsPerson } from './house/person/effects';
import { effectsRoom } from './house/room/effects';
import { propertiesStateReducer } from './properties/reducer';
import { PropertiesState } from './properties/state';

export interface AppState {
  houseState: HouseState;
  authState: AuthState;
  propertiesState: PropertiesState;
  common: CommonState;
}

export const provideStoreArgs = {
  authState: authStateReducer,
  houseState: reducerHouseState,
  propertiesState: propertiesStateReducer,
  common: commonStateReducer,
};

export const provideEffectArgs = [effectsHouse, effectsAuth, globalEffects, effectsPerson, effectsRoom, effectsCommon];
