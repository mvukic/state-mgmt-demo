import { personEntityAdapter } from '@state/person/state';
import { createSelector } from '@ngrx/store';
import { HouseState } from '@state/house';

const { selectEntities, selectAll } = personEntityAdapter.getSelectors();

export const selectPeople = createSelector(
  (state: HouseState) => state.people,
  (state) => selectAll(state),
);

export const selectPeopleByIds = (ids: string[]) =>
  createSelector(
    // Select all person entities
    selectEntities,
    // Get the entity at specified ids
    (entities) => ids.map((id) => entities[id]!),
  );
