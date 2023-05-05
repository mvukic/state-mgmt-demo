import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'create',
    loadComponent: () => import('./app/create.component'),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./app/edit.component')
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'create',
  },
];
