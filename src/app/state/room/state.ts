import { Room } from '@domain/room/model';
import { createEntityAdapter } from '@ngrx/entity';

export const roomEntityAdapter = createEntityAdapter<Room>({
  selectId: (room: Room) => room.id,
});

export const roomInitialState = roomEntityAdapter.getInitialState();
