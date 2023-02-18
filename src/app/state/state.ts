import { AuthState } from './auth/state';
import { MOState } from './mo/state';

export interface AppState {
  moState: MOState;
  authState: AuthState;
}
