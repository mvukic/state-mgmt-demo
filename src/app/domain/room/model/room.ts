import { WithId } from '@domain/generic/model';

export interface Room extends WithId {
  name: string;
  designation: string;
  people: string[];
}

export interface RoomStateUpdate extends WithId {
  name: string;
  designation: string;
}
