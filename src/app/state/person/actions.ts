import { createActionGroup, props } from '@ngrx/store';
import { Person } from '@domain/person/model';

export const personActions = createActionGroup({
  source: 'Person',
  events: {
    init: props<{ people: Person[] }>(),
    create: props<{ firstName: string; lastName: string }>(),
    update: props<{ personId: string; firstName: string; lastName: string }>(),
    delete: props<{ personId: string }>(),
  },
});
