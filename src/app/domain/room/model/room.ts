import { WithId } from '@domain/generic/model';
import { Person } from '@domain/person/model';

interface RoomBase extends WithId {
  name: string;
  designation: string;
}

export interface Room extends RoomBase {
  peopleIds: string[];
}

export interface RoomView extends RoomBase {
  people: Person[];
}
