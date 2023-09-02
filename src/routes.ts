import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateChildFn,
    ResolveFn,
    Router,
    Routes
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { Store, provideState } from '@ngrx/store';
import { selectorsAuthState } from '@state/auth';
import { effectsHouse, reducerHouseState } from '@state/house';
import { effectsPerson } from '@state/house/person/effects';
import { effectsRoom } from '@state/house/room/effects';
import { iif, of, switchMap } from 'rxjs';

export const authGuard: CanActivateChildFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store
    .select(selectorsAuthState.selectLoggedIn)
    .pipe(switchMap((isLoggedIn) => iif(() => isLoggedIn, of(true), of(router.createUrlTree(['login'])))));
};

export const resolveId: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('id')!;
  return Promise.resolve(id);
};

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./app/component/login'),
  },
  {
    path: 'house',
    canActivate: [authGuard],
    providers: [
      provideState({ name: 'house', reducer: reducerHouseState }),
      provideEffects(effectsHouse, effectsPerson, effectsRoom),
    ],
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
        resolve: { id: resolveId },
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'house',
  },
];
