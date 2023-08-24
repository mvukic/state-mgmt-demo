import { HttpError } from '@api';
import { createActionGroup, props } from '@ngrx/store';

export const actionsCommon = createActionGroup({
  source: 'Common',
  events: {
    setConfig: props<{ api: string }>(),
    setConstants: props<{ constant: string }>(),
    failure: (error: HttpError) => ({ message: error.message }),
  },
});
