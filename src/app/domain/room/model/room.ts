import { WithId } from '@domain/generic/model';
import { Person } from '@domain/person/model';

export type RoomBase = WithId & {
  name: string;
  designation: string;
};

export type RoomUpdate = {
  name: string;
  designation: string;
};

export type RoomCreate = {
  name: string;
  designation: string;
};

export type Room = RoomBase & {
  peopleIds: string[];
};

export type RoomView = RoomBase & {
  people: Person[];
};
