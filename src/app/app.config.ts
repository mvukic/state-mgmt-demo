import { APP_INITIALIZER, ApplicationConfig, Provider } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import { AuthApiService, ConfigApiService, ConstantsApiService } from '@api';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { Store, provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { actionsAuth, effectsAuth } from '@state/auth';
import { authFeature } from '@state/auth/feature';
import { effectsCommon } from '@state/common/effects';
import { globalEffects } from '@state/effects';
import { actionsProperties, propertiesFeature } from '@state/properties';
import { provideToastr } from 'ngx-toastr';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { routes } from '../routes';
import { provideClientHydration } from "@angular/platform-browser";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(),
    provideAppInitialization(),
    provideStore(),
    provideState(authFeature),
    provideState(propertiesFeature),
    provideEffects(effectsAuth, globalEffects, effectsCommon),
    provideRouterStore(),
    provideStoreDevtools({ connectOutsideZone: true }),
    provideRouter(routes, withComponentInputBinding(), withHashLocation())
  ],
};

function provideAppInitialization(): Provider {
  return {
    provide: APP_INITIALIZER,
    deps: [Store, ConfigApiService, AuthApiService, ConstantsApiService],
    multi: true,
    useFactory: (store: Store, config: ConfigApiService, auth: AuthApiService, constants: ConstantsApiService) => {
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
    },
  };
}
