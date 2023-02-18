import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { provideStore, Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { selectIsOpened } from './app/state/mo/selectors';
import { moStateReducer } from './app/state/mo/reducer';
import { authStateReducer } from './app/state/auth/reducer';
import { effectsMO } from './app/state/mo/effects';
import {effectsAuth} from "./app/state/auth/effects";

const routes: Routes = [
  {
    path: 'create',
    loadComponent: () => import('./app/create.component'),
  },
  {
    path: 'edit',
    loadComponent: () => import('./app/edit.component'),
    canMatch: [() => inject(Store).select(selectIsOpened)],
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
    provideEffects(effectsMO, effectsAuth),
    provideStoreDevtools(),
    provideRouter(routes),
  ],
}).catch((e) => console.log(e));
