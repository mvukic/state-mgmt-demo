import { WithId } from '@domain/generic/model';
import { House, HouseCreate, HouseUpdate } from '@domain/house/model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const actionsHouse = createActionGroup({
  source: 'House',
  events: {
    setHouse: props<House>(),
    create: props<HouseCreate>(),
    createSuccess: props<House>(),
    update: props<WithId & HouseUpdate>(),
    updateSuccess: props<House>(),
    load: props<WithId>(),
    loadSuccess: props<House>(),
    close: emptyProps(),
  },
});
