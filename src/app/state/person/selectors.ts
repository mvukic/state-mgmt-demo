import { createSelector } from '@ngrx/store';
import { personEntityAdapter } from '@state/person/state';
import { AppState } from '@state/state';

const selectPeopleState = (state: AppState) => state.houseState.people;
const { selectAll, selectEntities } = personEntityAdapter.getSelectors(selectPeopleState);

export const selectPeople = selectAll;

export const selectPeopleByIds = (ids: string[]) =>
  createSelector(
    // Select all person entities
    selectEntities,
    // Get the entity at specified ids
    (entities) => ids.map((id) => entities[id]!),
  );
