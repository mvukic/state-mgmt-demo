import { House, Person, Room } from '../../model/models';

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
