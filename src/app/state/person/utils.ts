import { HouseState } from '@state/house';
import { Person } from '@domain/person/model';
import { personEntityAdapter } from '@state/person/state';

export function initializePeople(state: HouseState, people: Person[]): HouseState {
  // Set person entity state to new values
  const update = personEntityAdapter.setAll(people, state.people);
  return { ...state, people: update };
}

export function addPerson(state: HouseState, firstName: string, lastName: string): HouseState {
  // Crate new person
  const person: Person = { id: crypto.randomUUID(), firstName, lastName };
  // Save it into person entity state
  const update = personEntityAdapter.addOne(person, state.people);
  // Return updated house state
  return { ...state, people: update };
}

export function updatePerson(state: HouseState, personId: string, firstName: string, lastName: string): HouseState {
  // Update some properties on specific person entity
  const update = personEntityAdapter.updateOne({ id: personId, changes: { firstName, lastName } }, state.people);
  // Return updated house state
  return { ...state, people: update };
}

export function deletePerson(state: HouseState, personId: string): HouseState {
  // Delete specific person entity
  const update = personEntityAdapter.removeOne(personId, state.people);
  // Return updated house state
  return { ...state, people: update };
}
