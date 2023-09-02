import { createSelector } from '@ngrx/store';
import { personEntityAdapter } from '@state/house/person/state';
import { AppState } from '@state/state';

// Get person selectors from top level state
const { selectAll, selectEntities } = personEntityAdapter.getSelectors((state: AppState) => state.house.people);

// Export public selectors
export const selectPersonState = {
  selectPeople: createSelector(selectAll, (people) => people),
  selectEntities: createSelector(selectEntities, (entities) => entities),
};
