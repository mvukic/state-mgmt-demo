import { inject } from '@angular/core';
import { CanActivateChildFn, Router, Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, Store } from '@ngrx/store';
import { selectorsAuthState } from '@state/auth';
import { commonFeature } from '@state/common';
import { effectsHouse, houseFeature } from '@state/house';
import { effectsPerson } from '@state/house/person/effects';
import { effectsRoom } from '@state/house/room/effects';
import { iif, of, switchMap } from 'rxjs';
import { effectsCommon } from '@state/common/effects';

export const authGuardLogin: CanActivateChildFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store
    .select(selectorsAuthState.selectLoggedIn)
    .pipe(switchMap((isLoggedIn) => iif(() => isLoggedIn, of(router.createUrlTree(['house'])), of(true))));
};

export const authGuardHouse: CanActivateChildFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store
    .select(selectorsAuthState.selectLoggedIn)
    .pipe(switchMap((isLoggedIn) => iif(() => isLoggedIn, of(true), of(router.createUrlTree(['login'])))));
};

// export const resolveHouseWithId: CanActivateFn = (route: ActivatedRouteSnapshot) => {
//   //   const id = route.paramMap.get('id')!;
//   //   inject(Store).dispatch(actionsHouse.load({ id }));
//   return true;
// };

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./app/component/login'),
    canActivate: [authGuardLogin],
  },
  {
    path: 'house',
    providers: [
      provideState(houseFeature),
      provideState(commonFeature),
      provideEffects(effectsHouse, effectsPerson, effectsRoom, effectsCommon),
    ],
    canActivate: [authGuardHouse],
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
        // canMatch: [resolveHouseWithId],
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
