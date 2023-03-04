import { createActionGroup, props } from '@ngrx/store';
import { PO } from '../../../model/models';

export const actionsPO = createActionGroup({
  source: 'PO',
  events: {
    init: props<{ pos: PO[] }>(),
    create: props<{ name: string; description: string }>(),
    update: props<PO>(),
    delete: props<{ poId: string }>(),
  },
});
