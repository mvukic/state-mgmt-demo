import { createReducer, on } from '@ngrx/store';
import { initialMOState } from './state';
import { actionsMO } from './actions';
import { actionsSWVP } from './swvp/actions';
import { insertItem, removeItem, updateItem } from '../generic';
import {
  add_PO_to_SWVP,
  getRandomPO,
  remove_PO_from_SWVP,
  remove_PO_from_SWVPs,
  update_PO_on_SWVPS,
} from './swvp/utils';
import { actionsPO } from './po/actions';

export const moStateReducer = createReducer(
  initialMOState(),
  on(actionsMO.create, (state, { name }) => ({
    ...state,
    mo: { id: crypto.randomUUID(), name },
    opened: true,
  })),
  on(actionsMO.init, (state, mo) => ({
    ...state,
    mo: { id: mo.id, name: mo.name },
    opened: true,
  })),
  on(actionsMO.update, (state, { name }) => ({
    ...state,
    mo: { ...state.mo, name },
  })),
  on(actionsMO.close, () => ({
    ...initialMOState(),
  })),
  on(actionsPO.create, (state, { name, description }) => ({
    ...state,
    pos: insertItem(state.pos, { id: crypto.randomUUID(), name, description }),
  })),
  on(actionsPO.update, (state, po) => ({
    ...state,
    pos: updateItem(state.pos, po),
  })),
  on(actionsPO.init, (state, { pos }) => ({
    ...state,
    pos,
  })),
  on(actionsPO.delete, (state, { poId }) => ({
    ...state,
    pos: removeItem(state.pos, poId),
    swvps: remove_PO_from_SWVPs(state, poId),
  })),
  on(actionsSWVP.create, (state, { name }) => ({
    ...state,
    swvps: insertItem(state.swvps, {
      id: crypto.randomUUID(),
      name,
      pos: getRandomPO(state.pos),
    }),
  })),
  on(actionsSWVP.init, (state, { swvps }) => ({
    ...state,
    swvps,
  })),
  on(actionsSWVP.update, (state, swvp) => ({
    ...state,
    swvps: updateItem(state.swvps, swvp),
  })),
  on(actionsSWVP.delete, (state, { swvpId }) => ({
    ...state,
    swvps: removeItem(state.swvps, swvpId),
  })),
  on(actionsSWVP.remove_po, (state, { swvpId, poId }) => ({
    ...state,
    swvps: remove_PO_from_SWVP(state, swvpId, poId),
  })),
  on(actionsSWVP.update_po, (state, { poId }) => ({
    ...state,
    swvps: update_PO_on_SWVPS(state.pos, state.swvps, poId),
  })),
  on(actionsSWVP.add_po, (state, { swvpId, poId }) => ({
    ...state,
    swvps: add_PO_to_SWVP(state.pos, state.swvps, swvpId, poId),
  }))
);
