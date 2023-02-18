import { AppState } from '../state';
import { createSelector } from '@ngrx/store';

const selectAuthNameFn = (state: AppState) => state.authState.name;
const selectAuthLoggedInFn = (state: AppState) => state.authState.loggedIn;

export const selectAuthName = createSelector(selectAuthNameFn, (name) => name);

export const selectAuthLoggedIn = createSelector(selectAuthLoggedInFn, (loggedIn) => loggedIn);

export const selectAuthNotLoggedIn = createSelector(selectAuthLoggedInFn, (loggedIn) => !loggedIn);
