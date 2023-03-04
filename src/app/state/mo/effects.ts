import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, switchMap, tap } from 'rxjs';
import { actionsMO } from './actions';
import { ApiService } from '../../api.service';

const onCreate = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(actionsMO.create),
      tap(() => router.navigateByUrl(`edit`))
    );
  },
  { functional: true, dispatch: false }
);

const onOpen = createEffect(
  (actions = inject(Actions), api = inject(ApiService)) => {
    return actions.pipe(
      ofType(actionsMO.open),
      switchMap(({ id }) => forkJoin([api.getMO(id), api.getPOs(id), api.getSWVPs(id)]))
    );
  },
  { functional: true, dispatch: false }
);

const onClose = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(actionsMO.close),
      tap(() => router.navigateByUrl('create'))
    );
  },
  { functional: true, dispatch: false }
);

export const moEffects = {
  onCreate,
  onClose,
  onOpen,
};
