import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { actionsAuth } from './actions';
import { actionsHouse } from '../house/actions';

const onLogoutEffect = createEffect(
  (actions = inject(Actions)) => {
    return actions.pipe(
      ofType(actionsAuth.logout),
      map(() => actionsHouse.close())
    );
  },
  { functional: true, dispatch: true }
);

export const authEffects = {
  onLogoutEffect,
};