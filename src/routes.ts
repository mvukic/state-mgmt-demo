import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectorsAuthState } from '@state/auth';
import { actionsHouse, selectorsHouseState } from '@state/house';
import { iif, map, of, switchMap } from 'rxjs';

export const authGuard: CanActivateChildFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store
    .select(selectorsAuthState.selectIsLoggedIn)
    .pipe(switchMap((isLoggedIn) => iif(() => isLoggedIn, of(true), of(router.createUrlTree(['login'])))));
};

export const openHouseViewGuard: CanActivateFn = (route) => {
  const id = route.paramMap.get('id')!;
  const store = inject(Store);

  return store.select(selectorsHouseState.selectIsSet).pipe(
    map((isSet) => {
      if (!isSet) {
        // Load house with the given id
        store.dispatch(actionsHouse.load({ id }));
      }
      return true;
    }),
  );
};

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./app/component/login'),
  },
  {
    path: 'house',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'create',
      },
      {
        path: 'create',
        loadComponent: () => import('./app/component/house/house.create'),
      },
      {
        path: ':id',
        loadComponent: () => import('./app/component/view'),
        canActivate: [openHouseViewGuard],
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'house',
  },
];
