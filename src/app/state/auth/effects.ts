import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { actionsAuth } from './actions';
import { actionsMO } from '../mo/actions';

const onLogoutEffect = createEffect(
  () => {
    return inject(Actions).pipe(
      ofType(actionsAuth.logout),
      map(() => actionsMO.close())
    );
  },
  { functional: true, dispatch: true }
);

export const effectsAuth = {
  onLogout: onLogoutEffect,
};
