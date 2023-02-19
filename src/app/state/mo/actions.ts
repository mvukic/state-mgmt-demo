import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MO } from '../../model/models';

export const actionsMO = createActionGroup({
  source: 'MO',
  events: {
    init: props<MO>(),
    create: props<{ name: string }>(),
    update: props<{ name: string }>(),
    open: props<{ id: string }>(),
    close: emptyProps(),
  },
});
