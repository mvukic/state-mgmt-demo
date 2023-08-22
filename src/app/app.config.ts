import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AuthApiService } from '@api';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { Store, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffectArgs, provideStoreArgs } from '@state';
import { actionsAuth } from '@state/auth';
import { catchError, map, of, switchMap } from 'rxjs';
import { routes } from '../routes';

function initSetup(store: Store, api: AuthApiService) {
  return () => {
    // Get constants from BE
    return api.getConstants().pipe(
      // Get user details (cookie will be implicitly used)
      switchMap(() =>
        api.getUser().pipe(
          // On success store users data into store
          map(({ name }) => store.dispatch(actionsAuth.init({ name }))),
          // On failure just emit the error
          catchError((message: string) => of(message)),
        ),
      ),
    );
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [Store, AuthApiService],
      multi: true,
      useFactory: initSetup,
    },
    provideStore(provideStoreArgs),
    provideEffects(provideEffectArgs),
    provideRouterStore(),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideRouter(routes, withComponentInputBinding()),
  ],
};
