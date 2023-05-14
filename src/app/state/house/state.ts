import { House } from '@domain/house/model';
import { Person } from '@domain/person/model';
import { Room } from '@domain/room/model';

export interface HouseState {
  house: House;
  people: Person[];
  rooms: Room[];
  viewed: boolean;
}

export const initialHouseState = (): HouseState => ({
  house: { id: '', name: '' },
  people: [],
  rooms: [],
  viewed: false,
});
