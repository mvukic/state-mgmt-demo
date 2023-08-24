import { inject } from '@angular/core';
import { ApiService } from '@api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { actionsCommon } from '@state/common';
import { actionsHouse } from '@state/house';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { actionsRoom } from './actions';

const onLoad = createEffect(
  (actions = inject(Actions), api = inject(ApiService)) => {
    return actions.pipe(
      ofType(actionsHouse.set),
      exhaustMap(({ id }) =>
        api.getRooms(id).pipe(
          map((rooms) => actionsRoom.set({ rooms })),
          catchError((message: string) => of(actionsCommon.failure({ message }))),
        ),
      ),
    );
  },
  { functional: true, dispatch: true },
);

export const effectsRoom = {
  onLoad,
};