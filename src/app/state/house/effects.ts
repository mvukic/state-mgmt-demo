import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { actionsCommon } from '@state/common';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { actionsHouse } from './actions';

const onCreate = createEffect(
  (actions = inject(Actions), api = inject(ApiService), store = inject(Store)) => {
    return actions.pipe(
      ofType(actionsHouse.create),
      exhaustMap(({ name }) =>
        api.createHouse(name).pipe(
          // On successful creation open that house and send notification
          map((response) => actionsHouse.set(response)),
          tap(() => store.dispatch(actionsCommon.success({ message: 'Created house' }))),
          // On failed creation emit new error event
          catchError((message: string) => of(actionsCommon.failure({ message }))),
        ),
      ),
    );
  },
  { functional: true, dispatch: true },
);

const onUpdate = createEffect(
  (actions = inject(Actions), api = inject(ApiService), store = inject(Store)) => {
    return actions.pipe(
      ofType(actionsHouse.update),
      exhaustMap(({ id, ...request }) =>
        api.updateHouse(id, request).pipe(
          map((response) => actionsHouse.updateSuccess(response)),
          tap(() => store.dispatch(actionsCommon.success({ message: 'Updated house' }))),
          // On failed update emit new error event
          catchError((message: string) => of(actionsCommon.failure({ message }))),
        ),
      ),
    );
  },
  { functional: true, dispatch: true },
);

const onLoad = createEffect(
  (actions = inject(Actions), api = inject(ApiService), store = inject(Store)) => {
    return actions.pipe(
      ofType(actionsHouse.load),
      exhaustMap(({ id }) =>
        api.getHouse(id).pipe(
          map((response) => actionsHouse.set(response)),
          tap(() => store.dispatch(actionsCommon.success({ message: 'Loaded house' }))),
          catchError((message: string) => of(actionsCommon.failure({ message }))),
        ),
      ),
    );
  },
  { functional: true, dispatch: true },
);

const onSet = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(actionsHouse.set),
      tap(({ id }) => router.navigate(['house', id])),
    );
  },
  { functional: true, dispatch: false },
);

const onClose = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(actionsHouse.close),
      // Navigate to house creation page
      tap(() => router.navigate(['house', 'create'])),
    );
  },
  { functional: true, dispatch: false },
);

export const effectsHouse = {
  onSet,
  onCreate,
  onLoad,
  onClose,
  onUpdate,
};
