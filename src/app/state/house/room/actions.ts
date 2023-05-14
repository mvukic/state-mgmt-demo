import { Room } from '@domain/room/model';
import { createActionGroup, props } from '@ngrx/store';

export const actionsRoom = createActionGroup({
  source: 'Room',
  events: {
    init: props<{ rooms: Room[] }>(),
    create: props<{ name: string; designation: string }>(),
    update: props<Room>(),
    delete: props<{ roomId: string }>(),
    addPerson: props<{ roomId: string; personId: string }>(),
    removePerson: props<{ roomId: string; personId: string }>(),
    updatePerson: props<{ personId: string }>(),
  },
});
