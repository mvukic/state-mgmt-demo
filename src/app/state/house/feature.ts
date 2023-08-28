import { createFeature } from '@ngrx/store';
import { reducerHouseState } from './reducer';

export const houseFeature = createFeature({
  name: 'houseState',
  reducer: reducerHouseState,
});
