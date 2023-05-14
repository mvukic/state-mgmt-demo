import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authEffects, authStateReducer } from '@state/auth';
import { houseEffects, houseStateReducer } from '@state/house';
import { personEffects } from '@state/house/person';
import { routes } from '../routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ houseState: houseStateReducer, authState: authStateReducer }),
    provideEffects(houseEffects, personEffects, authEffects),
    provideRouterStore(),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideRouter(routes, withComponentInputBinding()),
  ],
};
