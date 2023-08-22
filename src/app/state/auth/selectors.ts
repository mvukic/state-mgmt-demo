import { AppState } from '@state';
import { createSelector } from '@ngrx/store';

const selectAuthState = (state: AppState) => state.authState;

// Export public selectors
export const selectorsAuthState = {
  selectUserName: createSelector(selectAuthState, (state) => state.name),
  selectIsLoggedIn: createSelector(selectAuthState, (state) => state.loggedIn),
};
