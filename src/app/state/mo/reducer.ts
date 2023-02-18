import { createReducer, on } from '@ngrx/store';
import { PO, SWVP } from './models';
import { initialMOState, MOState } from './state';
import { actionsMO, actionsPO, actionsSWVP } from './actions';
import { insertItem, removeItem, updateItem } from '../generic';

export const moStateReducer = createReducer(
  initialMOState(),
  on(actionsMO.create, (state, { name }) => {
    return {
      ...state,
      mo: { id: crypto.randomUUID(), name },
      opened: true,
    };
  }),
  on(actionsMO.update, (state, { name }) => ({
    ...state,
    mo: { ...state.mo, name },
  })),
  on(actionsMO.close, (state) => ({
    ...initialMOState(),
  })),
  on(actionsPO.create, (state, { name }) => ({
    ...state,
    pos: insertItem(state.pos, { id: crypto.randomUUID(), name }),
  })),
  on(actionsPO.update, (state, po) => ({
    ...state,
    pos: updateItem(state.pos, po),
  })),
  on(actionsPO.delete, (state, { poId }) => {
    return {
      ...state,
      pos: removeItem(state.pos, poId),
      swvps: remove_PO_from_SWVPs(state, poId)
    };
  }),
  on(actionsSWVP.create, (state, { name }) => ({
    ...state,
    swvps: insertItem(state.swvps, {
      id: crypto.randomUUID(),
      name,
      pos: getRandomPO(state.pos),
    }),
  })),
  on(actionsSWVP.update, (state, swvp) => {
    return {
      ...state,
      swvps: updateItem(state.swvps, swvp),
    };
  }),
  on(actionsSWVP.delete, (state, { swvpId }) => ({
    ...state,
    swvps: removeItem(state.swvps, swvpId),
  })),
  on(actionsSWVP.remove_po, (state, { swvpId, poId }) => ({
    ...state,
    swvps: remove_PO_from_SWVP(state, swvpId, poId),
  }))
);

function getRandomPO(pos: PO[]) {
  if (pos.length === 0) {
    return [];
  }
  const index = Math.floor(Math.random() * pos.length);
  return [structuredClone(pos[index])];
}

function remove_PO_from_SWVP(state: MOState, swvpId: string, poId: string): SWVP[] {
  return state.swvps.map((swvp) => {
    if (swvp.id !== swvpId) {
      return { ...swvp };
    }
    return {
      ...swvp,
      pos: removeItem(swvp.pos, poId),
    };
  });
}

function remove_PO_from_SWVPs(state: MOState, poId: string): SWVP[] {
  return state.swvps.map((swvp) => {
    return {
      ...swvp,
      pos: removeItem(swvp.pos, poId),
    };
  });
}

function update_PO_on_SWVPS(state: MOState, id: string): SWVP[] {
  const po = state.pos.find((po) => po.id === id)!!;
  return state.swvps.map((swvp) => {
    return {
      ...swvp,
      pos: updateItem(swvp.pos, po),
    };
  });
}
