import { createFeature } from '@ngrx/store';
import { authStateReducer } from './reducer';

export const authFeature = createFeature({
  name: 'auth',
  reducer: authStateReducer,
});

