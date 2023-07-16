import { WithId } from '@domain/generic/model';

export interface Person extends WithId {
  firstName: string;
  lastName: string;
}
