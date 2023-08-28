import { createActionGroup, props } from '@ngrx/store';

export const actionsProperties = createActionGroup({
  source: 'Properties',
  events: {
    setConfig: props<{ api: string }>(),
    setConstants: props<{ constant: string }>(),
  },
});
