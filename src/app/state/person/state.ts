import { createEntityAdapter } from '@ngrx/entity';
import { Person } from '@domain/person/model';

export const selectPersonId = (person: Person) => person.id;

export const personEntityAdapter = createEntityAdapter<Person>({
  selectId: selectPersonId,
});
