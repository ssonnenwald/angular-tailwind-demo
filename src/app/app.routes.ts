import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/users/users').then((m) => m.Users),
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings').then((m) => m.Settings),
      },
      {
        path: 'styleguide',
        loadComponent: () => import('./pages/styleguide/styleguide').then((m) => m.Styleguide),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
