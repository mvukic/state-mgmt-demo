import { roomEntityAdapter } from '@state/room/state';
import { AppState } from '@state/state';

const selectRoomsState = (state: AppState) => state.houseState.rooms;

const { selectAll } = roomEntityAdapter.getSelectors(selectRoomsState);

export const selectRooms = selectAll;
