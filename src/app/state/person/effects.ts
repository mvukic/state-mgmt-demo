import { inject } from '@angular/core';
import { ApiService } from '@api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { actionsCommon } from '@state/common';
import { actionsHouse } from '@state/house';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { actionsPerson } from './actions';

const onLoad = createEffect(
  (actions = inject(Actions), api = inject(ApiService)) => {
    return actions.pipe(
      ofType(actionsHouse.set),
      exhaustMap(({ id }) =>
        api.getPeople(id).pipe(
          map((people) => actionsPerson.set({ people })),
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
      ofType(actionsPerson.create),
      exhaustMap((request) =>
        api.createPerson(request).pipe(
          map((response) => actionsPerson.createSuccess(response)),
          tap(({ firstName }) => store.dispatch(actionsCommon.success({ message: `Created person ${firstName}` }))),
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
      ofType(actionsPerson.update),
      exhaustMap(({ id, ...request }) =>
        api.updatePerson(id, request).pipe(
          map((response) => actionsPerson.updateSuccess(response)),
          tap(({ firstName }) => store.dispatch(actionsCommon.success({ message: `Updated person ${firstName}` }))),
          catchError((message: string) => of(actionsCommon.failure({ message }))),
        ),
      ),
    );
  },
  { functional: true, dispatch: true },
);

const onDelete = createEffect(
  (actions = inject(Actions), api = inject(ApiService), store = inject(Store)) => {
    return actions.pipe(
      ofType(actionsPerson.delete),
      exhaustMap(({ id }) =>
        api.deletePerson(id).pipe(
          map(() => actionsPerson.deleteSuccess({ id })),
          tap(() => store.dispatch(actionsCommon.success({ message: `Deleted person` }))),
          catchError((message: string) => of(actionsCommon.failure({ message }))),
        ),
      ),
    );
  },
  { functional: true, dispatch: true },
);

export const effectsPerson = {
  onLoad,
  onCreate,
  onUpdate,
  onDelete,
};
