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
  roles?: string[];
}

interface NavItem {
  label: string;
  icon: string;
  roles?: string[];
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
  '/dashboard/horarios': { title: 'Gestión de Horarios', subtitle: 'Horarios de trabajo de doctores y recepcionistas' },
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
  '/dashboard/mis-citas': { title: 'Mis Citas', subtitle: 'Consulta y atiende tus citas' },
  '/dashboard/mis-pacientes': { title: 'Mis Pacientes', subtitle: 'Pacientes relacionados con tu actividad' },
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
        { label: 'Mi horario', route: '/dashboard/horario' },
        { label: 'Gestión de horarios', route: '/dashboard/horarios', roles: ['ADMINISTRADOR'] },
      ],
    },
    {
      label: 'Citas',
      icon: 'calendar_today',
      roles: ['ADMINISTRADOR', 'RECEPCIONISTA', 'PACIENTE'],
      sub: [
        { label: 'Ver citas', route: '/dashboard/citas', roles: ['ADMINISTRADOR', 'PACIENTE'] },
        { label: 'Agendar cita', route: '/dashboard/citas/nuevo', roles: ['ADMINISTRADOR', 'RECEPCIONISTA'] },
        { label: 'Historial de citas', route: '/dashboard/historial-citas', roles: ['RECEPCIONISTA'] },
        { label: 'Citas por doctor', route: '/dashboard/citas/por-doctor', roles: ['ADMINISTRADOR'] },
      ],
    },
    {
      label: 'Mi Consultorio',
      icon: 'medical_services',
      roles: ['DOCTOR'],
      sub: [
        { label: 'Mis citas', route: '/dashboard/mis-citas', roles: ['DOCTOR'] },
        { label: 'Mis pacientes', route: '/dashboard/mis-pacientes', roles: ['DOCTOR'] },
      ],
    },
    {
      label: 'Pacientes',
      roles: ['ADMINISTRADOR', 'RECEPCIONISTA'],
      icon: 'groups',
      sub: [
        { label: 'Ver pacientes', route: '/dashboard/pacientes', roles: ['ADMINISTRADOR'] },
        { label: 'Nuevo paciente', route: '/dashboard/pacientes/nuevo', roles: ['ADMINISTRADOR', 'RECEPCIONISTA'] },
      ],
    },
    {
      label: 'Doctores',
      roles: ['ADMINISTRADOR'],
      icon: 'medical_services',
      sub: [
        { label: 'Ver doctores', route: '/dashboard/doctores', roles: ['ADMINISTRADOR'] },
        { label: 'Agregar doctor', route: '/dashboard/doctores/nuevo', roles: ['ADMINISTRADOR'] },
      ],
    },
    {
      label: 'Especialidades',
      roles: ['ADMINISTRADOR'],
      icon: 'local_hospital',
      sub: [
        { label: 'Ver especialidades', route: '/dashboard/especialidades', roles: ['ADMINISTRADOR'] },
      ],
    },
    {
      label: 'Recepcionistas',
      roles: ['ADMINISTRADOR'],
      icon: 'support_agent',
      sub: [
        { label: 'Ver recepcionistas', route: '/dashboard/recepcionistas', roles: ['ADMINISTRADOR'] },
        { label: 'Nuevo recepcionista', route: '/dashboard/recepcionistas/nuevo', roles: ['ADMINISTRADOR'] },
      ],
    },
    {
      label: 'Usuarios',
      roles: ['ADMINISTRADOR'],
      icon: 'manage_accounts',
      sub: [
        { label: 'Ver usuarios', route: '/dashboard/usuarios', roles: ['ADMINISTRADOR'] },
        { label: 'Nuevo usuario', route: '/dashboard/usuarios/nuevo', roles: ['ADMINISTRADOR'] },
        { label: 'Roles', route: '/dashboard/roles', roles: ['ADMINISTRADOR'] },
      ],
    },
  ];

  navItems = computed(() => {
    const rol = this.authService.getRole();

    return this.menuBase
      .map((item) => ({
        ...item,
        sub: item.sub?.filter((subItem) => !subItem.roles || subItem.roles.includes(rol)),
      }))
      .filter((item) => {
        if (item.roles && !item.roles.includes(rol)) return false;
        if (item.sub && item.sub.length === 0) return false;
        return true;
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
