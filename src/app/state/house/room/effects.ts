import { inject } from '@angular/core';
import { ApiService } from '@api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { actionsCommon } from '@state/common';
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
          catchError((message: string) => of(actionsCommon.failure({ message }))),
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
          tap(() => store.dispatch(actionsCommon.success({ message: `Created '${name}'` }))),
          catchError((message: string) => of(actionsCommon.failure({ message }))),
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
          tap(() => store.dispatch(actionsCommon.success({ message: `Updated person` }))),
          catchError((message: string) => of(actionsCommon.failure({ message }))),
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
          tap(() => store.dispatch(actionsCommon.success({ message: `Added person to room` }))),
          catchError((message: string) => of(actionsCommon.failure({ message }))),
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
          tap(() => store.dispatch(actionsCommon.success({ message: `Remved person from room` }))),
          catchError((message: string) => of(actionsCommon.failure({ message }))),
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
