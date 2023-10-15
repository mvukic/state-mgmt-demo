import { inject } from '@angular/core';
import { ApiService } from '@api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { actionsGlobal } from '@state/actions';
import { actionsHouse } from '@state/house';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { actionsPerson } from './actions';

const onSetHouse = createEffect(
  (actions = inject(Actions), api = inject(ApiService)) => {
    return actions.pipe(
      ofType(actionsHouse.setHouse),
      exhaustMap(({ id }) =>
        api.getPeople(id).pipe(
          map((people) => actionsPerson.set({ people })),
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
      ofType(actionsPerson.create),
      exhaustMap((request) =>
        api.createPerson(request).pipe(
          map((response) => actionsPerson.createSuccess(response)),
          tap(({ firstName }) => store.dispatch(actionsGlobal.success({ message: `Created person ${firstName}` }))),
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
      ofType(actionsPerson.update),
      exhaustMap(({ id, ...request }) =>
        api.updatePerson(id, request).pipe(
          map((response) => actionsPerson.updateSuccess(response)),
          tap(({ firstName }) => store.dispatch(actionsGlobal.success({ message: `Updated person ${firstName}` }))),
          catchError((message: string) => of(actionsGlobal.failure({ message }))),
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
          tap(() => store.dispatch(actionsGlobal.success({ message: `Deleted person` }))),
          catchError((message: string) => of(actionsGlobal.failure({ message }))),
        ),
      ),
    );
  },
  { functional: true, dispatch: true },
);

export const effectsPerson = {
  onSetHouse,
  onCreate,
  onUpdate,
  onDelete,
};
