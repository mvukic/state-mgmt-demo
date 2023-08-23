import { Person } from '@domain/person/model';
import { createActionGroup, props } from '@ngrx/store';

export const actionsPerson = createActionGroup({
  source: 'Person',
  events: {
    set: props<{ people: Person[] }>(),
    create: props<{ firstName: string; lastName: string }>(),
    update: props<{ personId: string; firstName: string; lastName: string }>(),
    delete: props<{ personId: string }>(),
  },
});
