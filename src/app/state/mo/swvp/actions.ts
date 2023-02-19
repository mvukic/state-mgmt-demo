import { createActionGroup, props } from '@ngrx/store';
import { SWVP } from '../../../model/models';

export const actionsSWVP = createActionGroup({
  source: 'SWVP',
  events: {
    create: props<{ name: string }>(),
    update: props<SWVP>(),
    init: props<{ swvps: SWVP[] }>(),
    delete: props<{ swvpId: string }>(),
    add_PO: props<{ swvpId: string; poId: string }>(),
    remove_PO: props<{ swvpId: string; poId: string }>(),
    update_PO: props<{ poId: string }>(),
  },
});
