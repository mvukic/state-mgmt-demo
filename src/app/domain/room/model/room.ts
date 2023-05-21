import { Person } from '@domain/person/model';
import { WithId } from '@domain/generic/model';

export interface Room extends WithId {
  name: string;
  designation: string;
  people: Person[];
}
