import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import { AuthService } from '../../features/auth/services/auth.service';
import { environment } from '../../../environments/environment';

interface SubNavItem {
  label: string;
  route: string;
  permiso?: string;
}

interface NavItem {
  label: string;
  icon: string;
  permiso?: string;
  sub?: SubNavItem[];
}

interface UsuarioRolInfo {
  nombres: string;
  rol: string;
}

interface MensajeResponse {
  mensaje: string;
  object: UsuarioRolInfo;
}

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/dashboard/inicio': { title: 'Inicio', subtitle: 'Resumen del consultorio' },
  '/dashboard/horario': { title: 'Horarios Médicos', subtitle: 'Planificación de turnos y disponibilidad' },
  '/dashboard/citas': { title: 'Citas médicas', subtitle: 'Agenda y consultas programadas' },
  '/dashboard/citas/nuevo': { title: 'Nueva cita', subtitle: 'Registrar cita médica' },
  '/dashboard/citas/por-doctor': { title: 'Citas por doctor', subtitle: 'Panel de consultas asignadas al médico' },
  '/dashboard/pacientes': { title: 'Pacientes', subtitle: 'Historial y datos de pacientes' },
  '/dashboard/pacientes/nuevo': { title: 'Nuevo paciente', subtitle: 'Registro de paciente' },
  '/dashboard/doctores': { title: 'Doctores', subtitle: 'Equipo médico del consultorio' },
  '/dashboard/doctores/nuevo': { title: 'Nuevo doctor', subtitle: 'Alta de especialista' },
  '/dashboard/especialidades': { title: 'Especialidades', subtitle: 'Áreas médicas disponibles' },
  '/dashboard/recepcionistas': { title: 'Recepcionistas', subtitle: 'Personal de recepción' },
  '/dashboard/recepcionistas/nuevo': { title: 'Nuevo recepcionista', subtitle: 'Alta de recepcionista' },
  '/dashboard/usuarios': { title: 'Usuarios', subtitle: 'Cuentas del sistema' },
  '/dashboard/usuarios/nuevo': { title: 'Nuevo usuario', subtitle: 'Crear cuenta de acceso' },
  '/dashboard/roles': { title: 'Roles', subtitle: 'Perfiles de acceso del sistema' },
};

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);

  open = true;
  expandedItem: string | null = 'Inicio';

  usuarioInfo = signal<UsuarioRolInfo | null>(null);
  cargandoPerfil = signal<boolean>(true);

  inicialAvatar = computed(() => {
    const info = this.usuarioInfo();
    return info && info.nombres ? info.nombres.charAt(0).toUpperCase() : '?';
  });

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  pageInfo = computed(() => {
    const url = this.currentUrl();
    return (
      PAGE_TITLES[url] ?? { title: 'Panel administrativo', subtitle: 'Gestión del consultorio' }
    );
  });

  private menuBase: NavItem[] = [
    {
      label: 'Inicio',
      icon: 'dashboard',
      sub: [
        { label: 'Resumen', route: '/dashboard/inicio' },
        { label: 'Horario', route: '/dashboard/horario' },
      ],
    },
    {
      label: 'Citas',
      icon: 'calendar_today',
      sub: [
        { label: 'Ver citas', route: '/dashboard/citas' },
        { label: 'Nueva cita', route: '/dashboard/citas/nuevo', permiso:'CITA_CREATE' },
        { label: 'Citas por doctor', route: '/dashboard/citas/por-doctor', permiso: 'CITA_READ' },
      ],
    },
    {
      label: 'Pacientes',
      permiso: 'PACIENTE_GESTIONAR',
      icon: 'groups',
      sub: [
        { label: 'Ver pacientes', route: '/dashboard/pacientes', permiso: 'PACIENTE_READ' },
        {
          label: 'Nuevo paciente',
          route: '/dashboard/pacientes/nuevo',
          permiso: 'PACIENTE_CREATE',
        },
      ],
    },
    {
      label: 'Doctores',
      permiso: 'DOCTOR_GESTIONAR',
      icon: 'medical_services',
      sub: [
        { label: 'Ver doctores', route: '/dashboard/doctores', permiso: 'DOCTOR_READ' },
        { label: 'Agregar doctor', route: '/dashboard/doctores/nuevo', permiso: 'DOCTOR_CREATE' },
      ],
    },
    {
      label: 'Especialidades',
      permiso: 'ESPECIALIDAD_GESTIONAR',
      icon: 'local_hospital',
      sub: [
        {
          label: 'Ver especialidades',
          route: '/dashboard/especialidades',
          permiso: 'ESPECIALIDAD_READ',
        },
      ],
    },
    {
      label: 'Recepcionistas',
      permiso: 'RECEPCIONISTA_GESTIONAR',
      icon: 'support_agent',
      sub: [
        {
          label: 'Ver recepcionistas',
          route: '/dashboard/recepcionistas',
          permiso: 'RECEPCIONISTA_READ',
        },
        {
          label: 'Nuevo recepcionista',
          route: '/dashboard/recepcionistas/nuevo',
          permiso: 'RECEPCIONISTA_CREATE',
        },
      ],
    },
    {
      label: 'Usuarios',
      permiso: 'USUARIO_GESTIONAR',
      icon: 'manage_accounts',
      sub: [
        { label: 'Ver usuarios', route: '/dashboard/usuarios', permiso: 'USUARIO_READ' },
        { label: 'Nuevo usuario', route: '/dashboard/usuarios/nuevo', permiso: 'USUARIO_CREATE' },
        { label: 'Roles', route: '/dashboard/roles', permiso: 'ROLES_CRUD' },
      ],
    },
  ];

  navItems = computed(() => {
    const permisosUsuario = this.authService.getAuthorities();

    return this.menuBase
      .filter((item) => !item.permiso || permisosUsuario.includes(item.permiso))
      .map((item) => {
        if (item.sub) {
          return {
            ...item,
            sub: item.sub.filter(
              (subItem) => !subItem.permiso || permisosUsuario.includes(subItem.permiso),
            ),
          };
        }
        return item;
      });
  });

  ngOnInit(): void {
    this.obtenerPerfilUsuario();
  }

  private obtenerPerfilUsuario() {
    const userId = this.authService.getUserId();
    const token = this.authService.getAccessToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<MensajeResponse>(`${environment.apiUrl}/usuarios/${userId}/rol`, { headers })
      .subscribe({
        next: (res) => {
          if (res && res.object) {
            this.usuarioInfo.set(res.object);
          }
          this.cargandoPerfil.set(false);
        },
        error: (err) => {
          console.error('Error al capturar datos del usuario', err);
          this.cargandoPerfil.set(false);
        },
      });
  }
  toggleSidebar() {
    this.open = !this.open;
    if (!this.open) this.expandedItem = null;
  }

  toggleMenu(label: string) {
    if (!this.open) this.open = true;
    this.expandedItem = this.expandedItem === label ? null : label;
  }

  logout() {
    const token = this.authService.getAccessToken();
    if (!token) {
      this.limpiarSesionLocal();
      return;
    }
    this.http
      .post(
        `${environment.apiUrl}/auth/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .subscribe({
        next: () => this.limpiarSesionLocal(),
        error: () => this.limpiarSesionLocal(),
      });
  }

  private limpiarSesionLocal() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }
}
