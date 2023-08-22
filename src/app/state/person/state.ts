import { Person } from '@domain/person/model';
import { createEntityAdapter } from '@ngrx/entity';

export const personEntityAdapter = createEntityAdapter<Person>({
  selectId: (person: Person) => person.id,
});

export const personInitialState = personEntityAdapter.getInitialState();
