import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const actionsMO = createActionGroup({
  source: 'MO',
  events: {
    create: props<{ name: string }>(),
    update: props<{ name: string }>(),
    close: emptyProps(),
  },
});
