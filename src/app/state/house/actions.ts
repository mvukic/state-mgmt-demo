import { House } from '@domain/house/model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const actionsHouse = createActionGroup({
  source: 'House',
  events: {
    set: props<House>(),
    create: props<{ name: string }>(),
    createSuccess: props<{ id: string; name: string }>(),
    update: props<{ name: string }>(),
    load: props<{ id: string }>(),
    loadSuccess: props<{ id: string }>(),
    close: emptyProps(),
  },
});
