import { inject } from '@angular/core';
import { ApiService } from '@api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { actionsGlobal } from '@state/actions';
import { actionsAuth } from '@state/auth';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { actionsCommon } from './actions';

const onSetUser = createEffect(
  (actions = inject(Actions), api = inject(ApiService)) => {
    return actions.pipe(
      ofType(actionsAuth.setUser),
      // Fetch common data for all houses
      exhaustMap(() =>
        api.commonHousesData().pipe(
          tap((response) => console.log('_Common', response)),
          map((response) => actionsCommon.set({ data: response })),
          catchError((message: string) => of(actionsGlobal.failure({ message }))),
        ),
      ),
    );
  },
  { functional: true, dispatch: true },
);

export const effectsCommon = {
  onSetUser,
};
