import { createSelector } from '@ngrx/store';
import { personEntityAdapter } from '@state/person/state';
import { AppState } from '@state/state';

// Get person selectors from top level state
const { selectAll, selectEntities } = personEntityAdapter.getSelectors((state: AppState) => state.houseState.people);

// Export public selectors
export const selectPersonState = {
  all: createSelector(selectAll, (people) => people),
  entities: createSelector(selectEntities, (entities) => entities),
};
