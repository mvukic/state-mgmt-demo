import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffectArgs, provideStoreArgs } from '@state';
import { routes } from '../routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(provideStoreArgs),
    provideEffects(provideEffectArgs),
    provideRouterStore(),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideRouter(routes, withComponentInputBinding()),
  ],
};
