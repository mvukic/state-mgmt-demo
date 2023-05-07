import { AuthState } from './auth/state';
import { HouseState } from './house/state';

export interface AppState {
  houseState: HouseState;
  authState: AuthState;
}
