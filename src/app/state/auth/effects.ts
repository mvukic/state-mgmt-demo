import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '@api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { actionsAuth } from '@state/auth';
import { actionsCommon } from '@state/common.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

const onLogin = createEffect(
  (actions = inject(Actions), api = inject(AuthApiService)) => {
    return actions.pipe(
      ofType(actionsAuth.login),
      exhaustMap(({ name }) =>
        api.login(name).pipe(
          map((name) => actionsAuth.loginSuccess(name)),
          catchError((message: string) => of(actionsCommon.failure({ message }))),
        ),
      ),
    );
  },
  { functional: true, dispatch: true },
);

const onLoginSuccess = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(actionsAuth.loginSuccess, actionsAuth.set),
      // Navigate to default page after successful log in or init
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
