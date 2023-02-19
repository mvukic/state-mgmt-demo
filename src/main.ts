import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { provideStore, Store } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { moStateReducer } from './app/state/mo/reducer';
import { authStateReducer } from './app/state/auth/reducer';
import { moEffects } from './app/state/mo/effects';
import { effectsAuth } from './app/state/auth/effects';
import { poEffects } from './app/state/mo/po/effects';
import { inject } from '@angular/core';
import { actionsMO } from './app/state/mo/actions';

const routes: Routes = [
  {
    path: 'create',
    loadComponent: () => import('./app/create.component'),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./app/edit.component'),
    canMatch: [
      () => {
        const id = 'test-mo-id';
        inject(Store).dispatch(actionsMO.open({ id }));
        return true;
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'create',
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ moState: moStateReducer, authState: authStateReducer }),
    provideEffects(moEffects, poEffects, effectsAuth),
    // provideRouterStore(),
    provideStoreDevtools(),
    provideRouter(routes),
  ],
}).catch((e) => console.log(e));
