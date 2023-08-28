import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { APP_INITIALIZER, ApplicationConfig, Provider } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { AuthApiService, ConfigApiService, ConstantsApiService } from '@api';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { Store, provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffectArgs } from '@state';
import { actionsAuth, authStateReducer } from '@state/auth';
import { propertiesStateReducer } from '@state/properties';
import { actionsProperties } from '@state/properties/actions';
import { provideToastr } from 'ngx-toastr';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { routes } from '../routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(),
    provideAppInitialization(),
    provideLocationStrategy(),
    provideStore(),
    provideState({ name: 'authState', reducer: authStateReducer }),
    provideState({ name: 'commonState', reducer: propertiesStateReducer }),
    provideEffects(provideEffectArgs),
    provideRouterStore(),
    provideStoreDevtools({ connectOutsideZone: true }),
    provideRouter(routes, withComponentInputBinding(), withRouterConfig({ onSameUrlNavigation: 'ignore' })),
  ],
};

function initSetup(store: Store, config: ConfigApiService, auth: AuthApiService, constants: ConstantsApiService) {
  return () => {
    return config._getConfig().pipe(
      tap((response) => store.dispatch(actionsProperties.setConfig(response))),
      switchMap(() => constants._getConstants()),
      tap((response) => store.dispatch(actionsProperties.setConstants(response))),
      switchMap(() => auth._getUser()),
      map((response) => store.dispatch(actionsAuth.set(response))),
      catchError((message: string) => of(message)),
    );
  };
}

function provideAppInitialization(): Provider {
  return {
    provide: APP_INITIALIZER,
    deps: [Store, ConfigApiService, AuthApiService, ConstantsApiService],
    multi: true,
    useFactory: initSetup,
  };
}

function provideLocationStrategy(): Provider {
  return {
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  };
}
