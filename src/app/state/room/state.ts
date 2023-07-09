import { createEntityAdapter } from '@ngrx/entity';
import { Room } from '@domain/room/model';

export const selectRoomId = (room: Room) => room.id;

export const roomEntityAdapter = createEntityAdapter<Room>({
  selectId: selectRoomId,
});
