import { Person } from '@domain/person/model';

export interface Room {
  id: string;
  name: string;
  designation: string;
  people: Person[];
}
