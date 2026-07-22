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
        path: 'citas',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/clinica/citas/pages/lista-citas/lista-citas-medicas-component').then(
                (m) => m.ListaCitaComponent,
              ),
          },
          {
            path: 'nuevo',
            canActivate: [authGuard],
            data: { permisoRequerido: 'CITA_CREATE' },
            loadComponent: () =>
              import('./features/clinica/citas/pages/crear-cita/crear-cita.component').then(
                (m) => m.CrearCitaComponent,
              ),
          },
          {
            path: 'por-doctor',
            canActivate: [authGuard],
            data: { permisoRequerido: 'CITA_READ' },
            loadComponent: () =>
              import('./features/clinica/citas/pages/lista-citas/lista-citas-medicas-component').then(
                (m) => m.ListaCitaComponent,
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
            canActivate: [authGuard],
            data: { permisoRequerido: 'DOCTOR_READ' },
            loadComponent: () =>
              import('./features/clinica/doctores/pages/lista-doctores/lista-doctores.component').then(
                (m) => m.ListaDoctoresComponent,
              ),
          },
          {
            path: 'nuevo',
            canActivate: [authGuard],
            data: { permisoRequerido: 'DOCTOR_CREATE' },
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
        data: { permisoRequerido: 'ESPECIALIDAD_GESTIONAR' },
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
            data: { permisoRequerido: 'RECEPCIONISTA_READ' },
            loadComponent: () =>
              import('./features/clinica/recepcionistas/pages/lista-recepcionistas/lista-recepcionistas.component').then(
                (m) => m.ListaRecepcionistasComponent,
              ),
          },
          {
            path: 'nuevo',
            canActivate: [authGuard],
            data: { permisoRequerido: 'RECEPCIONISTA_CREATE' },
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
        data: { permisoRequerido: 'ROLES_CRUD' },
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
            data: { permisoRequerido: 'USUARIO_READ' },
            loadComponent: () =>
              import('./features/admin/usuarios/pages/lista-usuarios/lista-usuarios.component').then(
                (m) => m.ListaUsuariosComponent,
              ),
          },
          {
            path: 'nuevo',
            canActivate: [authGuard],
            data: { permisoRequerido: 'USUARIO_CREATE' },
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
