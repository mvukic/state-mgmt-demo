import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'create',
    loadComponent: () => import('./app/house.create'),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./app/house.view')
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'create',
  },
];
