import { createFeature } from '@ngrx/store';
import { commonStateReducer } from './reducer';

export const commonFeature = createFeature({
  name: 'common',
  reducer: commonStateReducer,
});
