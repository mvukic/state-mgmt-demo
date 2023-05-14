import { AppState } from '@state';
import { createSelector } from '@ngrx/store';

const selectAuthFn = (state: AppState) => state.authState;

export const selectUserName = createSelector(selectAuthFn, (state) => state.name);

export const selectIsLoggedIn = createSelector(selectAuthFn, (state) => state.loggedIn);

export const selectIsNotLoggedIn = createSelector(selectAuthFn, (state) => !state.loggedIn);
