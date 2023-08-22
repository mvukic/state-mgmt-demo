import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { actionsHouse } from './actions';

const onCreate = createEffect(
  (actions = inject(Actions), api = inject(ApiService)) => {
    return actions.pipe(
      ofType(actionsHouse.create),
      exhaustMap(({ name }) =>
        api.createHouse(name).pipe(
          // On successful creation just open that house
          map(({ id }) => actionsHouse.open({ id })),
          // On failed creation emit new error event
          catchError((message: string) => of(actionsHouse.createFailure({ message }))),
        ),
      ),
    );
  },
  { functional: true, dispatch: true },
);

const onInit = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(actionsHouse.init),
    //   tap(({ id }) => router.navigate(['house', id])),
    );
  },
  { functional: true, dispatch: false },
);

const onOpen = createEffect(
  (actions = inject(Actions), api = inject(ApiService)) => {
    return actions.pipe(
      ofType(actionsHouse.open),
      // Fetch related house data
      switchMap(({ id }) => forkJoin([api.getHouse(id), api.getPeople(id), api.getRooms(id)])),
    );
  },
  { functional: true, dispatch: false },
);

const onClose = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(actionsHouse.close),
      tap(() => router.navigate(['house', 'create'])),
    );
  },
  { functional: true, dispatch: false },
);

export const effectsHouse = {
  onCreate,
  onOpen,
  onClose,
  onInit,
};
