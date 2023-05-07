import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { actionsPerson } from './actions';
import { map } from 'rxjs';
import { actionsRoom } from '../room/actions';

const onUpdate = createEffect(
  (actions = inject(Actions)) => {
    return actions.pipe(
      ofType(actionsPerson.update),
      map(({ id }) => actionsRoom.updatePerson({ personId: id }))
    );
  },
  { functional: true, dispatch: true }
);

export const personEffects = {
  onUpdate,
};
