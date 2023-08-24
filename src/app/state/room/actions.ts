import { WithId } from '@domain/generic/model';
import { Room, RoomCreate, RoomUpdate } from '@domain/room/model';
import { createActionGroup, props } from '@ngrx/store';

export const actionsRoom = createActionGroup({
  source: 'Room',
  events: {
    set: props<{ rooms: Room[] }>(),
    create: props<RoomCreate>(),
    createSuccess: props<Room>(),
    update: props<WithId & RoomUpdate>(),
    updateSuccess: props<Room>(),
    delete: props<{ roomId: string }>(),
    addPerson: props<{ roomId: string; personId: string }>(),
    removePerson: props<{ roomId: string; personId: string }>(),
  },
});
