import { inject } from '@angular/core';
import { NotifyService } from '@common/notify.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { actionsGlobal } from './actions';

const onFailure = createEffect(
  (actions = inject(Actions), notify = inject(NotifyService)) => {
    return actions.pipe(
      ofType(actionsGlobal.failure),
      tap(({ message }) => notify.notify(message, false)),
    );
  },
  { functional: true, dispatch: false },
);

const onSuccess = createEffect(
  (actions = inject(Actions), notify = inject(NotifyService)) => {
    return actions.pipe(
      ofType(actionsGlobal.success),
      tap(({ message }) => notify.notify(message, true)),
    );
  },
  { functional: true, dispatch: false },
);

export const globalEffects = {
  onFailure,
  onSuccess,
};
