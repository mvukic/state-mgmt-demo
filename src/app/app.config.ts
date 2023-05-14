import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { houseStateReducer } from './state/house/reducer';
import { authStateReducer } from './state/auth/reducer';
import { houseEffects } from './state/house/effects';
import { authEffects } from './state/auth/effects';
import { personEffects } from './state/house/person/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { isDevMode } from '@angular/core';
import { routes } from '../routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ houseState: houseStateReducer, authState: authStateReducer }),
    provideEffects(houseEffects, personEffects, authEffects),
    provideRouterStore(),
    ...[isDevMode() ? provideStoreDevtools() : []],
    provideRouter(routes, withComponentInputBinding()),
  ],
};
