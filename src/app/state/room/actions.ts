import { Room, RoomStateUpdate } from '@domain/room/model';
import { createActionGroup, props } from '@ngrx/store';

export const actionsRoom = createActionGroup({
  source: 'Room',
  events: {
    init: props<{ rooms: Room[] }>(),
    create: props<{ name: string; designation: string }>(),
    update: props<{ roomId: string; name: string; designation: string }>(),
    delete: props<{ roomId: string }>(),
    addPerson: props<{ roomId: string; personId: string }>(),
    removePerson: props<{ roomId: string; personId: string }>(),
    updatePerson: props<{ personId: string }>(),
  },
});
