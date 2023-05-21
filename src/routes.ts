import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'create',
    loadComponent: () => import('./app/component/house/house.create'),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./app/component/view')
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'create',
  },
];
