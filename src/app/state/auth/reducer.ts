import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './state';
import { actionsAuth } from './actions';

export const authStateReducer = createReducer(
  initialAuthState(),
  on(actionsAuth.logout, (state) => ({
    ...state,
    name: 'Anonymous',
    loggedIn: false,
  })),
  on(actionsAuth.login, (state, { name }) => ({
    ...state,
    name,
    loggedIn: true,
  }))
);
