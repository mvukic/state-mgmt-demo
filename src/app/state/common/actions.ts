import { createActionGroup, props } from '@ngrx/store';

export const actionsCommon = createActionGroup({
  source: 'Common',
  events: {
    set: props<{ data: string[] }>(),
  },
});
