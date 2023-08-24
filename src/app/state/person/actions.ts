import { WithId } from '@domain/generic/model';
import { Person, PersonCreate, PersonUpdate } from '@domain/person/model';
import { createActionGroup, props } from '@ngrx/store';

export const actionsPerson = createActionGroup({
  source: 'Person',
  events: {
    set: props<{ people: Person[] }>(),
    create: props<PersonCreate>(),
    createSuccess: props<Person>(),
    update: props<WithId & PersonUpdate>(),
    updateSuccess: props<Person>(),
    delete: props<WithId>(),
  },
});
