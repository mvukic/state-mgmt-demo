import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, switchMap, tap } from 'rxjs';
import { actionsHouse } from './actions';
import { ApiService } from '../../api/api.service';

const onCreate = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(actionsHouse.create),
      tap(() => router.navigateByUrl(`edit`))
    );
  },
  { functional: true, dispatch: false }
);

const onOpen = createEffect(
  (actions = inject(Actions), api = inject(ApiService)) => {
    return actions.pipe(
      ofType(actionsHouse.open),
      switchMap(({ id }) => forkJoin([api.getHouse(id), api.getPeople(id), api.getRooms(id)]))
    );
  },
  { functional: true, dispatch: false }
);

const onClose = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(actionsHouse.close),
      tap(() => router.navigateByUrl('create'))
    );
  },
  { functional: true, dispatch: false }
);

export const houseEffects = {
  onCreate,
  onClose,
  onOpen,
};
