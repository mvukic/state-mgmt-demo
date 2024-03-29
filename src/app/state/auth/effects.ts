import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '@api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { actionsGlobal } from '@state/actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { actionsAuth } from './actions';

const onLogin = createEffect(
  (actions = inject(Actions), api = inject(AuthApiService)) => {
    return actions.pipe(
      ofType(actionsAuth.login),
      exhaustMap(({ name }) =>
        api.login(name).pipe(
          map((name) => actionsAuth.loginSuccess(name)),
          catchError((message: string) => of(actionsGlobal.failure({ message }))),
        ),
      ),
    );
  },
  { functional: true, dispatch: true },
);

const onLoginSuccess = createEffect(
  (actions = inject(Actions), router = inject(Router), store = inject(Store)) => {
    return actions.pipe(
      ofType(actionsAuth.loginSuccess, actionsAuth.setUser),
      // Navigate to default page after successful log in or init
      tap(() => store.dispatch(actionsGlobal.success({ message: 'Successful log in' }))),
      map(({ name }) => {
        localStorage.setItem('user', name);
        router.navigate(['house', 'create']);
      }),
    );
  },
  { functional: true, dispatch: false },
);

const onLogout = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(actionsAuth.logout),
      // Clear user data
      tap(() => localStorage.removeItem('user')),
      // Navigate to login page
      tap(() => router.navigate(['login'])),
    );
  },
  { functional: true, dispatch: false },
);

export const effectsAuth = {
  onLogin,
  onLoginSuccess,
  onLogout,
};
