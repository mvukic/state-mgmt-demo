import { House } from '@domain/house/model';
import { Person } from '@domain/person/model';
import { Room } from '@domain/room/model';
import { EntityState } from '@ngrx/entity';
import { personInitialState } from '@state/person';
import { roomInitialState } from '@state/room';

export interface HouseState {
  house: House;
  people: EntityState<Person>;
  rooms: EntityState<Room>;
  viewed: boolean;
}

export const initialHouseState = (): HouseState => ({
  house: { id: '', name: '' },
  people: personInitialState,
  rooms: roomInitialState,
  viewed: false,
});
