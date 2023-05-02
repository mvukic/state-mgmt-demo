import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { actionsPO } from './actions';
import { map } from 'rxjs';
import { actionsSWVP } from '../swvp/actions';

const onUpdate = createEffect(
  (actions = inject(Actions)) => {
    return actions.pipe(
      ofType(actionsPO.update),
      map(({ id }) => actionsSWVP.update_PO({ poId: id }))
    );
  },
  { functional: true, dispatch: true }
);

export const poEffects = {
  onUpdate,
};
