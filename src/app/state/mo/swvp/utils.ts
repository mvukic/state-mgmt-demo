import { MOState } from '../state';
import { PO, SWVP } from '../../../model/models';
import { insertItem, removeItem, updateItem } from '../../generic';

export function remove_PO_from_SWVP(state: MOState, swvpId: string, poId: string): SWVP[] {
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

export function remove_PO_from_SWVPs(state: MOState, poId: string): SWVP[] {
  return state.swvps.map((swvp) => {
    return {
      ...swvp,
      pos: removeItem(swvp.pos, poId),
    };
  });
}

export function update_PO_on_SWVPS(pos: PO[], swvps: SWVP[], id: string): SWVP[] {
  const po = pos.find((po) => po.id === id)!;
  return swvps.map((swvp) => {
    return {
      ...swvp,
      pos: updateItem(swvp.pos, po),
    };
  });
}

export function add_PO_to_SWVP(pos: PO[], swvps: SWVP[], swvpId: string, poId: string): SWVP[] {
  const po = pos.find((po) => po.id === poId)!;
  return swvps.map((swvp) => {
    if (swvp.id !== swvpId) {
      return swvp;
    }

    return {
      ...swvp,
      pos: insertItem(swvp.pos, po),
    };
  });
}

export function getRandomPO(pos: PO[]) {
  if (pos.length === 0) {
    return [];
  }
  const index = Math.floor(Math.random() * pos.length);
  return [structuredClone(pos[index])];
}
