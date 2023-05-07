import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { House } from '../../model/models';

export const actionsHouse = createActionGroup({
  source: 'House',
  events: {
    init: props<House>(),
    create: props<{ name: string }>(),
    update: props<{ name: string }>(),
    open: props<{ id: string }>(),
    close: emptyProps(),
  },
});
