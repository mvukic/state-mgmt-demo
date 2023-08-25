import { createSelector } from '@ngrx/store';
import { AppState } from '@state';

const authState = (state: AppState) => state.authState;

// Export public selectors
export const selectorsAuthState = {
  selectName: createSelector(authState, (state) => state.name),
  selectLoggedIn: createSelector(authState, (state) => state.loggedIn),
};

// import { authFeature } from './feature';

// // const authState = (state: AppState) => state.authState;

// const { selectAuthState, selectName, selectLoggedIn } = authFeature;

// // Export public selectors
// export const selectorsAuthState = {
//   selectAuthState,
//   selectName,
//   selectLoggedIn,
// };
