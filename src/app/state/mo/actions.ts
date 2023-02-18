import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {PO, SWVP} from "./models";

export const actionsMO = createActionGroup({
  source: 'MO',
  events: {
    create: props<{ name: string }>(),
    update: props<{ name: string }>(),
    close: emptyProps(),
  },
});

export const actionsPO = createActionGroup({
  source: 'PO',
  events: {
    create: props<{ name: string }>(),
    update: props<PO>(),
    delete: props<{ poId: string }>(),
  },
});

export const actionsSWVP = createActionGroup({
  source: 'SWVP',
  events: {
    create: props<{ name: string }>(),
    update: props<SWVP>(),
    delete: props<{ swvpId: string }>(),
    add_PO: props<{ swvpId: string; poId: string }>(),
    remove_PO: props<{ swvpId: string; poId: string }>(),
  },
});
