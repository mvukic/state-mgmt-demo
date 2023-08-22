import { inject } from '@angular/core';
import { CanMatchFn, Router, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectorsAuthState } from '@state/auth';
import { iif, mergeMap, of } from 'rxjs';

export const canMatchFn: CanMatchFn = () => {
  const router = inject(Router);
  return inject(Store)
    .select(selectorsAuthState.selectIsLoggedIn)
    .pipe(mergeMap((isLoggedIn) => iif(() => isLoggedIn, of(true), of(router.createUrlTree(['login'])))));
};

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./app/component/login'),
  },
  {
    path: 'house',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'create',
      },
      {
        path: 'create',
        loadComponent: () => import('./app/component/house/house.create'),
        canMatch: [canMatchFn],
      },
      {
        path: ':id',
        loadComponent: () => import('./app/component/view'),
        canMatch: [canMatchFn],
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
