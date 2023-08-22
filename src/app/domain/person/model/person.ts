import { WithId } from '@domain/generic/model';

interface PersonBase extends WithId {
  firstName: string;
  lastName: string;
}

export interface Person extends PersonBase {}

export interface PersonView extends PersonBase {}
