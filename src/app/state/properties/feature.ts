import { createFeature } from '@ngrx/store';
import { propertiesStateReducer } from './reducer';

export const propertiesFeature = createFeature({
  name: 'properties',
  reducer: propertiesStateReducer,
});
