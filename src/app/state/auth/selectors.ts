import { authFeature } from './feature';

const { selectAuthState, selectName, selectLoggedIn } = authFeature;

export const selectorsAuthState = {
  selectAuthState,
  selectName,
  selectLoggedIn,
};
