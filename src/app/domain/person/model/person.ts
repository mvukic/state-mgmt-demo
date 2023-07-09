import { WithId } from '@domain/generic/model';

export interface Person extends WithId {
  firstName: string;
  lastName: string;
}

export interface PersonStateUpdate extends WithId {
  firstName: string;
  lastName: string;
}

export interface PersonStateCreate {
  firstName: string;
  lastName: string;
}
