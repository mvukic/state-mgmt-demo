import { createEntityAdapter } from '@ngrx/entity';
import { Person } from '@domain/person/model';

export const personEntityAdapter = createEntityAdapter<Person>({
  selectId: (person: Person) => person.id,
});

export const personInitialState = personEntityAdapter.getInitialState();
