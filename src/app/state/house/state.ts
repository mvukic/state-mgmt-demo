import { House } from '@domain/house/model';
import { Person } from '@domain/person/model';
import { Room } from '@domain/room/model';
import { EntityState } from '@ngrx/entity';
import { personEntityAdapter } from '@state/person';
import { roomEntityAdapter } from '@state/room';

export interface HouseState {
  house: House;
  people: EntityState<Person>;
  rooms: EntityState<Room>;
  viewed: boolean;
}

export const initialHouseState = (): HouseState => ({
  house: { id: '', name: '' },
  people: personEntityAdapter.getInitialState(),
  rooms: roomEntityAdapter.getInitialState(),
  viewed: false,
});
