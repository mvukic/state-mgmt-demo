import { ActionCreator, ReducerTypes, on } from '@ngrx/store';
import { HouseState } from '@state/house';
import { actionsPerson } from './actions';
import { addPerson, deletePerson, initializePeople, updatePerson } from './utils';

// prettier-ignore
export const personEvents: ReducerTypes<HouseState, readonly ActionCreator[]>[]  = [
    on(actionsPerson.set, (state, { people }): HouseState => initializePeople(state, people)),
    on(actionsPerson.createSuccess, (state, { firstName, lastName }): HouseState => addPerson(state, firstName, lastName)),
    on(actionsPerson.updateSuccess, (state, { id, firstName, lastName }): HouseState => updatePerson(state, id, firstName, lastName)),
    on(actionsPerson.deleteSuccess, (state, { id }): HouseState => deletePerson(state, id)),
];
