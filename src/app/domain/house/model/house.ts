import { WithId } from '@domain/generic/model';

export type HouseBase = WithId & {
  name: string;
}

export type HouseUpdate = {
    name: string;
}

export type HouseCreate = {
    name: string;
}

export interface House extends HouseBase {}

export interface HouseView extends HouseBase {}
