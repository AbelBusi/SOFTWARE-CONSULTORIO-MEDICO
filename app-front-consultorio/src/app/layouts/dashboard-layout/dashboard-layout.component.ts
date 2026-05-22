import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';

interface SubNavItem {
  label: string;
  route: string;
}

interface NavItem {
  label: string;
  icon: string;
  sub?: SubNavItem[];
}

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/dashboard/inicio': { title: 'Inicio', subtitle: 'Resumen del consultorio' },
  '/dashboard/citas': { title: 'Citas médicas', subtitle: 'Agenda y consultas programadas' },
  '/dashboard/citas/nuevo': { title: 'Nueva cita', subtitle: 'Registrar cita médica' },
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
export class DashboardLayoutComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  open = true;
  expandedItem: string | null = 'Inicio';

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
    return PAGE_TITLES[url] ?? { title: 'Panel administrativo', subtitle: 'Gestión del consultorio' };
  });

  navItems: NavItem[] = [
    {
      label: 'Inicio',
      icon: 'dashboard',
      sub: [{ label: 'Resumen', route: '/dashboard/inicio' }],
    },
    {
      label: 'Citas',
      icon: 'calendar_today',
      sub: [
        { label: 'Ver citas', route: '/dashboard/citas' },
        { label: 'Nueva cita', route: '/dashboard/citas/nuevo' },
      ],
    },
    {
      label: 'Pacientes',
      icon: 'groups',
      sub: [
        { label: 'Ver pacientes', route: '/dashboard/pacientes' },
        { label: 'Nuevo paciente', route: '/dashboard/pacientes/nuevo' },
      ],
    },
    {
      label: 'Doctores',
      icon: 'medical_services',
      sub: [
        { label: 'Ver doctores', route: '/dashboard/doctores' },
        { label: 'Agregar doctor', route: '/dashboard/doctores/nuevo' },
      ],
    },
    {
      label: 'Especialidades',
      icon: 'local_hospital',
      sub: [{ label: 'Ver especialidades', route: '/dashboard/especialidades' }],
    },
    {
      label: 'Recepcionistas',
      icon: 'support_agent',
      sub: [
        { label: 'Ver recepcionistas', route: '/dashboard/recepcionistas' },
        { label: 'Nuevo recepcionista', route: '/dashboard/recepcionistas/nuevo' },
      ],
    },
    {
      label: 'Usuarios',
      icon: 'manage_accounts',
      sub: [
        { label: 'Ver usuarios', route: '/dashboard/usuarios' },
        { label: 'Nuevo usuario', route: '/dashboard/usuarios/nuevo' },
        { label: 'Roles', route: '/dashboard/roles' },
      ],
    },
  ];

  toggleSidebar() {
    this.open = !this.open;
    if (!this.open) this.expandedItem = null;
  }

  toggleMenu(label: string) {
    if (!this.open) this.open = true;
    this.expandedItem = this.expandedItem === label ? null : label;
  }

  logout() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.limpiarSesionLocal();
      return;
    }
    this.http
      .post('/auth/logout', {}, { headers: { Authorization: `Bearer ${token}` } })
      .subscribe({ next: () => this.limpiarSesionLocal(), error: () => this.limpiarSesionLocal() });
  }

  private limpiarSesionLocal() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }
}
