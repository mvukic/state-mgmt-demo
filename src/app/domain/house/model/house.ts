import { WithId } from '@domain/generic/model';

interface HouseBase extends WithId {
  name: string;
}

export interface House extends HouseBase {}

export interface HouseView extends HouseBase {}
