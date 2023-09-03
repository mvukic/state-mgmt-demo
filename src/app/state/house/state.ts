import { House } from '@domain/house/model';
import { Person } from '@domain/person/model';
import { Room } from '@domain/room/model';
import { EntityState } from '@ngrx/entity';
import { personInitialState } from '@state/house/person';
import { roomInitialState } from '@state/house/room';

export interface HouseState {
  house: House;
  people: EntityState<Person>;
  rooms: EntityState<Room>;
  isSet: boolean;
  loading: boolean;
}

export const initialHouseState = (): HouseState => ({
  house: { id: '', name: '' },
  people: personInitialState,
  rooms: roomInitialState,
  isSet: false,
  loading: false
});
