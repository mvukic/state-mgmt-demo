import { House } from '@domain/house/model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const actionsHouse = createActionGroup({
  source: 'House',
  events: {
    init: props<House>(),
    create: props<{ name: string }>(),
    createSuccess: props<{ id: string, name: string }>(),
    createFailure: props<{ message: string }>(),
    update: props<{ name: string }>(),
    open: props<{ id: string }>(),
    close: emptyProps(),
  },
});
