import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

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
          route: '/dashboard/citas/nueva',
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
  }

  toggleMenu(label: string) {
    this.expandedItem = this.expandedItem === label ? null : label;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    window.location.href = '/login';
  }
}
