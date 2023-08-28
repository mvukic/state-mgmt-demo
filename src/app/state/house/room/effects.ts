import { inject } from '@angular/core';
import { ApiService } from '@api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { actionsGlobal } from '@state/actions';
import { actionsHouse } from '@state/house';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { actionsRoom } from './actions';

const onLoad = createEffect(
  (actions = inject(Actions), api = inject(ApiService)) => {
    return actions.pipe(
      ofType(actionsHouse.set),
      exhaustMap(({ id }) =>
        api.getRooms(id).pipe(
          map((rooms) => actionsRoom.set({ rooms })),
          catchError((message: string) => of(actionsGlobal.failure({ message }))),
        ),
      ),
    );
  },
  { functional: true, dispatch: true },
);

const onCreate = createEffect(
  (actions = inject(Actions), api = inject(ApiService), store = inject(Store)) => {
    return actions.pipe(
      ofType(actionsRoom.create),
      exhaustMap((request) =>
        api.createRoom(request).pipe(
          map((response) => actionsRoom.createSuccess(response)),
          tap(() => store.dispatch(actionsGlobal.success({ message: `Created '${name}'` }))),
          catchError((message: string) => of(actionsGlobal.failure({ message }))),
        ),
      ),
    );
  },
  { functional: true, dispatch: true },
);

const onUpdate = createEffect(
  (actions = inject(Actions), api = inject(ApiService), store = inject(Store)) => {
    return actions.pipe(
      ofType(actionsRoom.update),
      exhaustMap(({ id, ...request }) =>
        api.updateRoom(id, request).pipe(
          map((response) => actionsRoom.updateSuccess(response)),
          // TODO: select person from store
          tap(() => store.dispatch(actionsGlobal.success({ message: `Updated person` }))),
          catchError((message: string) => of(actionsGlobal.failure({ message }))),
        ),
      ),
    );
  },
  { functional: true, dispatch: true },
);

const onAddPerson = createEffect(
  (actions = inject(Actions), api = inject(ApiService), store = inject(Store)) => {
    return actions.pipe(
      ofType(actionsRoom.addPerson),
      exhaustMap(({ roomId, personId }) =>
        api.addPersonToRoom(roomId, personId).pipe(
          map(() => actionsRoom.addPersonSuccess({ roomId, personId })),
          // TODO: select person and room from store
          tap(() => store.dispatch(actionsGlobal.success({ message: `Added person to room` }))),
          catchError((message: string) => of(actionsGlobal.failure({ message }))),
        ),
      ),
    );
  },
  { functional: true, dispatch: true },
);

const onRemovePerson = createEffect(
  (actions = inject(Actions), api = inject(ApiService), store = inject(Store)) => {
    return actions.pipe(
      ofType(actionsRoom.removePerson),
      exhaustMap(({ roomId, personId }) =>
        api.removePersonFromRoom(roomId, personId).pipe(
          map(() => actionsRoom.removePersonSuccess({ roomId, personId })),
          // TODO: select person and room from store
          tap(() => store.dispatch(actionsGlobal.success({ message: `Remved person from room` }))),
          catchError((message: string) => of(actionsGlobal.failure({ message }))),
        ),
      ),
    );
  },
  { functional: true, dispatch: true },
);

export const effectsRoom = {
  onLoad,
  onCreate,
  onUpdate,
  onAddPerson,
  onRemovePerson,
};
