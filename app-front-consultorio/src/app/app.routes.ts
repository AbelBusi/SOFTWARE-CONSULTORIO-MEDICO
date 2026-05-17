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

      {
        path: 'citas',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/clinica/citas/pages/lista-citas/citas.component').then(
                (m) => m.CitasComponent, // Asegúrate de que el class exportado en ese archivo se llame CitasComponent
              ),
          },
          {
            path: 'nuevo',
            loadComponent: () =>
              import('./features/clinica/citas/pages/crear-cita/crear-cita.component').then(
                (m) => m.CrearCitaComponent,
              ),
          },
        ],
      },

      {
        path: 'pacientes',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/clinica/pacientes/pages/lista-pacientes/lista-pacientes.component').then(
                (m) => m.ListaPacientesComponent,
              ),
          },
          {
            path: 'nuevo',
            loadComponent: () =>
              import('./features/clinica/pacientes/pages/crear-paciente/crear-paciente.component').then(
                (m) => m.CrearPacienteComponent,
              ),
          },
        ],
      },

      {
        path: 'doctores',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/clinica/doctores/pages/lista-doctores/lista-doctores.component').then(
                (m) => m.ListaDoctoresComponent,
              ),
          },
          {
            path: 'nuevo',
            loadComponent: () =>
              import('./features/clinica/doctores/pages/crear-doctor/crear-doctor.component').then(
                (m) => m.CrearDoctorComponent,
              ),
          },
        ],
      },

      {
        path: 'especialidades',
        loadComponent: () =>
          import('./features/clinica/especialidad/pages/lista-especialidad/lista-especialidad.component').then(
            (m) => m.ListaEspecialidadComponent,
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
