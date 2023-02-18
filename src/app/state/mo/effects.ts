import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import {actionsMO, actionsPO} from './actions';

const onCreateMOEffect = createEffect(
  () => {
    const router = inject(Router);
    return inject(Actions).pipe(
      ofType(actionsMO.create),
      tap(() => router.navigateByUrl('edit'))
    );
  },
  { functional: true, dispatch: false }
);

const onCloseMOEffect = createEffect(
  () => {
    const router = inject(Router);
    return inject(Actions).pipe(
      ofType(actionsMO.close),
      tap(() => router.navigateByUrl('create'))
    );
  },
  { functional: true, dispatch: false }
);

export const effectsMO = {
  onCreate: onCreateMOEffect,
  onClose: onCloseMOEffect
};
