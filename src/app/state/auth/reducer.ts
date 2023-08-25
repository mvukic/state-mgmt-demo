import { createReducer, on } from '@ngrx/store';
import { actionsAuth } from './actions';
import { AuthState, initialAuthState } from './state';

// prettier-ignore
export const authStateReducer = createReducer(
  initialAuthState(),
  on(actionsAuth.set, (state, { name }): AuthState => ({ ...state, name, loggedIn: true })),
  on(actionsAuth.logout, (state): AuthState => ({ ...state, name: '', loggedIn: false })),
  on(actionsAuth.loginSuccess, (state, { name }): AuthState => ({ ...state, name, loggedIn: true }) ),
);
