import { createActionGroup, props } from '@ngrx/store';
import { PO } from '../../../model/models';

export const actionsPO = createActionGroup({
  source: 'PO',
  events: {
    create: props<{ name: string }>(),
    update: props<PO>(),
    delete: props<{ poId: string }>(),
  },
});
