import { createActionGroup, props } from '@ngrx/store';
import { Person } from '@domain/person/model';

export const actionsPerson = createActionGroup({
  source: 'Person',
  events: {
    init: props<{ people: Person[] }>(),
    create: props<{ firstName: string; lastName: string }>(),
    update: props<Person>(),
    delete: props<{ personId: string }>(),
  },
});
