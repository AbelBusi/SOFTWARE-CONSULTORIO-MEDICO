import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
  },

  {
    path: 'dashboard',

    loadComponent: () =>
      import('./layouts/dashboard-layout/dashboard-layout.component').then(
        (m) => m.DashboardLayoutComponent,
      ),

    children: [
      {
        path: '',
        redirectTo: 'citas',
        pathMatch: 'full',
      },

      // TEMPORAL
      {
        path: 'citas',
        loadComponent: () =>
          import('./shared/components/empty-page/empty-page.component').then(
            (m) => m.EmptyPageComponent,
          ),
      },

      {
        path: 'pacientes',
        loadComponent: () =>
          import('./shared/components/empty-page/empty-page.component').then(
            (m) => m.EmptyPageComponent,
          ),
      },

      {
        path: 'doctores',
        loadComponent: () =>
          import('./shared/components/empty-page/empty-page.component').then(
            (m) => m.EmptyPageComponent,
          ),
      },

      {
        path: 'especialidades',
        loadComponent: () =>
          import('./shared/components/empty-page/empty-page.component').then(
            (m) => m.EmptyPageComponent,
          ),
      },
    ],
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
