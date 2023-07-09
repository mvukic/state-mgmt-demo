import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { personActions } from './actions';
import { map } from 'rxjs';
import { actionsRoom } from 'src/app/state/room';

const update = createEffect(
  (actions = inject(Actions)) => {
    return actions.pipe(
      ofType(personActions.update),
      map(({ personId }) => actionsRoom.updatePerson({ personId })),
    );
  },
  { functional: true, dispatch: true },
);

export const personEffects = {
  update,
};
