import { createActionGroup, props } from '@ngrx/store';
import { PO } from '../../../model/models';

export const actionsPO = createActionGroup({
  source: 'PO',
  events: {
    create: props<{ name: string, description: string }>(),
    update: props<PO>(),
    init: props<{ pos: PO[]}>(),
    delete: props<{ poId: string }>(),
  },
});
