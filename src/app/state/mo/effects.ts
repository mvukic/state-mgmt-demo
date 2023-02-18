import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { actionsMO } from './actions';

const onOpen = createEffect(
  (actions = inject(Actions), router = inject(Router)) => {
    return actions.pipe(
      ofType(actionsMO.create),
      tap(() => router.navigateByUrl('edit'))
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
  onOpen,
  onClose,
};
