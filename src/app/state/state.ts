import { AuthState } from '@state/auth';
import { HouseState } from '@state/house';

export interface AppState {
  houseState: HouseState;
  authState: AuthState;
}
