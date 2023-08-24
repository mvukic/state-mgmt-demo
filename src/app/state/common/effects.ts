import { inject } from '@angular/core';
import { NotifyService } from '@common/notify.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { actionsCommon } from './actions';

const onFailure = createEffect(
  (actions = inject(Actions), notify = inject(NotifyService)) => {
    return actions.pipe(
      ofType(actionsCommon.failure),
      tap(({ message }) => {
        notify.notify(message);
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const commonEffects = {
  onFailure,
};
