import { createActionGroup, props } from '@ngrx/store';
import { Person, PersonStateCreate, PersonStateUpdate } from '@domain/person/model';

export const actionsPerson = createActionGroup({
  source: 'Person',
  events: {
    init: props<{ people: Person[] }>(),
    create: props<PersonStateCreate>(),
    update: props<PersonStateUpdate>(),
    delete: props<{ personId: string }>(),
  },
});
