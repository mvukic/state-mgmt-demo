import { HttpError } from '@api';
import { Room } from '@domain/room/model';
import { createActionGroup, props } from '@ngrx/store';

export const actionsRoom = createActionGroup({
  source: 'Room',
  events: {
    set: props<{ rooms: Room[] }>(),
    create: props<{ name: string; designation: string }>(),
    update: props<{ roomId: string; name: string; designation: string }>(),
    delete: props<{ roomId: string }>(),
    addPerson: props<{ roomId: string; personId: string }>(),
    removePerson: props<{ roomId: string; personId: string }>(),
    failure: props<HttpError>(),
  },
});
