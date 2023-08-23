import { HttpError } from '@api';
import { createActionGroup } from '@ngrx/store';

export const actionsCommon = createActionGroup({
  source: 'Common',
  events: {
    failure: (error: HttpError) => ({ message: error.message }),
  },
});
