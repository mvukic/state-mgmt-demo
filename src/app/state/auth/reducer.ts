import { createReducer, on } from '@ngrx/store';
import { actionsAuth } from './actions';
import { AuthState, initialAuthState } from './state';

export const authStateReducer = createReducer(
  initialAuthState(),
  on(
    actionsAuth.init,
    (state, { name }): AuthState => ({
      ...state,
      name,
      loggedIn: true,
    }),
  ),
  on(
    actionsAuth.logout,
    (state): AuthState => ({
      ...state,
      name: 'Anonymous',
      loggedIn: false,
    }),
  ),
  on(
    actionsAuth.loginSuccess,
    (state, { name }): AuthState => ({
      ...state,
      name,
      loggedIn: true,
    }),
  ),
);
