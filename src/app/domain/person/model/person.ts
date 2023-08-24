import { WithId } from '@domain/generic/model';

export type PersonBase = WithId & {
  firstName: string;
  lastName: string;
};

export type PersonUpdate = {
  firstName: string;
  lastName: string;
};

export type PersonCreate = {
  firstName: string;
  lastName: string;
};

export type Person = PersonBase;

export type PersonView = PersonBase;
