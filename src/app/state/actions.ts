import { HttpError } from '@api';
import { createActionGroup, props } from '@ngrx/store';

export const actionsGlobal = createActionGroup({
  source: 'Global',
  events: {
    failure: (error: HttpError) => ({ message: error.message }),
    success: props<{ message: string }>(),
  },
});
