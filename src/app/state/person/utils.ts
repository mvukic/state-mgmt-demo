import { HouseState } from '@state/house';
import { Person } from '@domain/person/model';
import { personEntityAdapter } from '@state/person/state';

export function initializePeople(state: HouseState, people: Person[]): HouseState {
  // Set person entity state to new values
  return { ...state, people: personEntityAdapter.setAll(people, state.people) };
}

export function addPerson(state: HouseState, firstName: string, lastName: string): HouseState {
  // Crate new person
  const person: Person = { id: crypto.randomUUID(), firstName, lastName };
  // Save it into person entity state
  return { ...state, people: personEntityAdapter.addOne(person, state.people) };
}

export function updatePerson(state: HouseState, personId: string, firstName: string, lastName: string): HouseState {
  // Update some properties on specific person entity
  return {
    ...state,
    people: personEntityAdapter.updateOne({ id: personId, changes: { firstName, lastName } }, state.people),
  };
}

export function deletePerson(state: HouseState, personId: string): HouseState {
  // Delete specific person entity
  return { ...state, people: personEntityAdapter.removeOne(personId, state.people) };
}
