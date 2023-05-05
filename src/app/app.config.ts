import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { moStateReducer } from './state/mo/reducer';
import { authStateReducer } from './state/auth/reducer';
import { moEffects } from './state/mo/effects';
import { authEffects } from './state/auth/effects';
import { poEffects } from './state/mo/po/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { isDevMode } from '@angular/core';
import { routes } from '../routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ moState: moStateReducer, authState: authStateReducer }),
    provideEffects(moEffects, poEffects, authEffects),
    provideRouterStore(),
    ...[isDevMode() ? provideStoreDevtools() : []],
    provideRouter(routes, withComponentInputBinding()),
  ],
};
