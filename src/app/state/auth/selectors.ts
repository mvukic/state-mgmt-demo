import { createSelector } from '@ngrx/store';
import { AppState } from '@state';

const authState = (state: AppState) => state.authState;

// Export public selectors
// eslint-disable-next-line @ngrx/prefix-selectors-with-select
export const selectorsAuthState = {
  selectName: createSelector(authState, (state) => state.name),
  selectLoggedIn: createSelector(authState, (state) => state.loggedIn),
};