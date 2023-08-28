import { createFeature } from '@ngrx/store';
import { authStateReducer } from './reducer';

export const authFeature = createFeature({
  name: 'authState',
  reducer: authStateReducer,
});

// import { authFeature } from './feature';

// // const authState = (state: AppState) => state.authState;

// const { selectAuthState, selectName, selectLoggedIn } = authFeature;

// // Export public selectors
// export const selectorsAuthState = {
//   selectAuthState,
//   selectName,
//   selectLoggedIn,
// };
