import { createSelector } from '@ngrx/store';
import { roomEntityAdapter } from '@state/room';

const selectors = roomEntityAdapter.getSelectors();
export const roomSelectors = {
  selectAll: selectors.selectAll,
  selectById: (id: string) => createSelector(
    selectors.selectEntities,
    (entities) => entities[id]
  ),
};
