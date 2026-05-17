import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface SubNavItem {
  label: string;
  route: string;
}

interface NavItem {
  label: string;
  route?: string;
  icon: string;
  sub?: SubNavItem[];
}

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
  expandedItem: string | null = 'Citas';

  navItems: NavItem[] = [
    {
      label: 'Citas',
      icon: 'calendar_today',
      sub: [
        {
          label: 'Ver citas',
          route: '/dashboard/citas',
        },
        {
          label: 'Nueva cita',
          route: '/dashboard/citas/nuevo',
        },
      ],
    },
    {
      label: 'Pacientes',
      icon: 'groups',
      sub: [
        {
          label: 'Ver pacientes',
          route: '/dashboard/pacientes',
        },
        {
          label: 'Nuevo paciente',
          route: '/dashboard/pacientes/nuevo',
        },
      ],
    },
    {
      label: 'Doctores',
      icon: 'person',
      sub: [
        {
          label: 'Ver doctores',
          route: '/dashboard/doctores',
        },
        {
          label: 'Agregar doctor',
          route: '/dashboard/doctores/nuevo',
        },
      ],
    },
    {
      label: 'Especialidades',
      icon: 'sell',
      sub: [
        {
          label: 'Ver especialidades',
          route: '/dashboard/especialidades',
        },
      ],
    },
  ];

  toggleSidebar() {
    this.open = !this.open;
    if (!this.open) {
      this.expandedItem = null;
    }
  }

  toggleMenu(label: string) {
    if (!this.open) {
      this.open = true;
    }
    this.expandedItem = this.expandedItem === label ? null : label;
  }

  logout() {
    const token = localStorage.getItem('access_token');

    if (!token) {
      this.limpiarSesionLocal();
      return;
    }

    this.http
      .post(
        '/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .subscribe({
        next: () => {
          this.limpiarSesionLocal();
        },
        error: () => {
          this.limpiarSesionLocal();
        },
      });
  }

  private limpiarSesionLocal() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }
}
