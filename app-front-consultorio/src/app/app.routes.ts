import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/dashboard-layout/dashboard-layout.component').then(
        (m) => m.DashboardLayoutComponent,
      ),
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      {
        path: 'inicio',
        loadComponent: () =>
          import('./features/dashboard/pages/inicio/inicio.component').then(
            (m) => m.InicioComponent,
          ),
      },
      {
        path: 'horario',
        loadComponent: () =>
          import('./features/dashboard/pages/horario/horario.component').then(
            (m) => m.HorarioComponent,
          ),
      },
      {
        path: 'horarios',
        canActivate: [authGuard],
        data: { roles: ['ADMINISTRADOR'] },
        loadComponent: () =>
          import('./features/clinica/horarios/pages/lista-horarios/lista-horarios.component').then(
            (m) => m.ListaHorariosComponent,
          ),
      },
      {
        path: 'citas',
        children: [
          {
            path: '',
            canActivate: [authGuard],
            data: { roles: ['ADMINISTRADOR'] },
            loadComponent: () =>
              import('./features/clinica/citas/pages/lista-citas/lista-citas-medicas-component').then(
                (m) => m.ListaCitaComponent,
              ),
          },
          {
            path: 'nuevo',
            canActivate: [authGuard],
            data: { roles: ['ADMINISTRADOR', 'RECEPCIONISTA'] },
            loadComponent: () =>
              import('./features/clinica/citas/pages/crear-cita/crear-cita.component').then(
                (m) => m.CrearCitaComponent,
              ),
          },
          {
            path: 'por-doctor',
            canActivate: [authGuard],
            data: { roles: ['ADMINISTRADOR'] },
            loadComponent: () =>
              import('./features/clinica/citas/pages/lista-citas/lista-citas-medicas-component').then(
                (m) => m.ListaCitaComponent,
              ),
          },
        ],
      },
      {
        path: 'historial-citas',
        canActivate: [authGuard],
        data: { roles: ['RECEPCIONISTA'] },
        loadComponent: () =>
          import('./features/clinica/citas/pages/historial-citas/historial-citas.component').then(
            (m) => m.HistorialCitasComponent,
          ),
      },
      {
        path: 'mis-citas',
        canActivate: [authGuard],
        data: { roles: ['DOCTOR'] },
        loadComponent: () =>
          import('./features/doctor/pages/mis-citas/mis-citas.component').then(
            (m) => m.MisCitasComponent,
          ),
      },
      {
        path: 'mis-pacientes',
        canActivate: [authGuard],
        data: { roles: ['DOCTOR'] },
        loadComponent: () =>
          import('./features/doctor/pages/mis-pacientes/mis-pacientes.component').then(
            (m) => m.MisPacientesComponent,
          ),
      },
      {
        path: 'mis-citas-paciente',
        canActivate: [authGuard],
        data: { roles: ['PACIENTE'] },
        loadComponent: () =>
          import('./features/paciente/pages/mis-citas/mis-citas.component').then(
            (m) => m.MisCitasPacienteComponent,
          ),
      },
      {
        path: 'mi-historia',
        canActivate: [authGuard],
        data: { roles: ['PACIENTE'] },
        loadComponent: () =>
          import('./features/paciente/pages/mi-historia/mi-historia.component').then(
            (m) => m.MiHistoriaComponent,
          ),
      },
      {
        path: 'pacientes',
        children: [
          {
            path: '',
            canActivate: [authGuard],
            data: { roles: ['ADMINISTRADOR'] },
            loadComponent: () =>
              import('./features/clinica/pacientes/pages/lista-pacientes/lista-pacientes.component').then(
                (m) => m.ListaPacientesComponent,
              ),
          },
          {
            path: 'nuevo',
            canActivate: [authGuard],
            data: { roles: ['ADMINISTRADOR', 'RECEPCIONISTA'] },
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
            canActivate: [authGuard],
            data: { roles: ['ADMINISTRADOR'] },
            loadComponent: () =>
              import('./features/clinica/doctores/pages/lista-doctores/lista-doctores.component').then(
                (m) => m.ListaDoctoresComponent,
              ),
          },
          {
            path: 'nuevo',
            canActivate: [authGuard],
            data: { roles: ['ADMINISTRADOR'] },
            loadComponent: () =>
              import('./features/clinica/doctores/pages/crear-doctor/crear-doctor.component').then(
                (m) => m.CrearDoctorComponent,
              ),
          },
        ],
      },
      {
        path: 'especialidades',
        canActivate: [authGuard],
        data: { roles: ['ADMINISTRADOR'] },
        loadComponent: () =>
          import('./features/clinica/especialidad/pages/lista-especialidad/lista-especialidad.component').then(
            (m) => m.ListaEspecialidadComponent,
          ),
      },
      {
        path: 'recepcionistas',
        children: [
          {
            path: '',
            canActivate: [authGuard],
            data: { roles: ['ADMINISTRADOR'] },
            loadComponent: () =>
              import('./features/clinica/recepcionistas/pages/lista-recepcionistas/lista-recepcionistas.component').then(
                (m) => m.ListaRecepcionistasComponent,
              ),
          },
          {
            path: 'nuevo',
            canActivate: [authGuard],
            data: { roles: ['ADMINISTRADOR'] },
            loadComponent: () =>
              import('./features/clinica/recepcionistas/pages/crear-recepcionista/crear-recepcionista.component').then(
                (m) => m.CrearRecepcionistaComponent,
              ),
          },
        ],
      },
      {
        path: 'roles',
        canActivate: [authGuard],
        data: { roles: ['ADMINISTRADOR'] },
        loadComponent: () =>
          import('./features/admin/roles/pages/lista-roles/lista-roles.component').then(
            (m) => m.ListaRolesComponent,
          ),
      },
      {
        path: 'usuarios',
        children: [
          {
            path: '',
            canActivate: [authGuard],
            data: { roles: ['ADMINISTRADOR'] },
            loadComponent: () =>
              import('./features/admin/usuarios/pages/lista-usuarios/lista-usuarios.component').then(
                (m) => m.ListaUsuariosComponent,
              ),
          },
          {
            path: 'nuevo',
            canActivate: [authGuard],
            data: { roles: ['ADMINISTRADOR'] },
            loadComponent: () =>
              import('./features/admin/usuarios/pages/crear-usuario/crear-usuario.component').then(
                (m) => m.CrearUsuarioComponent,
              ),
          },

          {
            path: '**',
            loadComponent: () =>
              import('../app/features/shared/pages/not-found/not-found').then((m) => m.NotFound),
          },
        ],
      },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
