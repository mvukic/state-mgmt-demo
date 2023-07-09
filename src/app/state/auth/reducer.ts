import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from "./state";
import { actionsAuth } from './actions';

export const authStateReducer = createReducer(
  initialAuthState(),
  on(actionsAuth.logout, (state): AuthState => ({
    ...state,
    name: 'Anonymous',
    loggedIn: false,
  })),
  on(actionsAuth.login, (state, { name }): AuthState => ({
    ...state,
    name,
    loggedIn: true,
  }))
);
