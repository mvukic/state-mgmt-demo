import { AuthState } from '@state/auth';
import { HouseState } from '@state/house';
import { CommonState } from './common';
import { PropertiesState } from './properties/state';

export interface AppState {
  house: HouseState;
  auth: AuthState;
  properties: PropertiesState;
  common: CommonState;
}