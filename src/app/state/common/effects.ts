import { inject } from '@angular/core';
import { ApiService } from '@api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { actionsGlobal } from '@state/actions';
import { actionsAuth } from '@state/auth';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { actionsCommon } from './actions';

const onLoginSuccess = createEffect(
  (actions = inject(Actions), api = inject(ApiService)) => {
    return actions.pipe(
      ofType(actionsAuth.loginSuccess, actionsAuth.setUser),
      // Fetch common data for all houses
      exhaustMap(() => {
        return api.commonHousesData().pipe(
          map((response) => actionsCommon.set({ common: response })),
          catchError((message: string) => of(actionsGlobal.failure({ message }))),
        );
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const effectsCommon = {
  onLoginSuccess,
};
