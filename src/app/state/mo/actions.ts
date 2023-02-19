import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MO } from '../../model/models';

export const actionsMO = createActionGroup({
  source: 'MO',
  events: {
    create: props<{ name: string }>(),
    update: props<{ name: string }>(),
    open: props<{ id: string }>(),
    init: props<MO>(),
    close: emptyProps(),
  },
});
