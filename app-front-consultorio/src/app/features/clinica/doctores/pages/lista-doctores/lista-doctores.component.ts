import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetalleDoctorModalComponent } from '../../components/detalle-doctor-modal/detalle-doctor-modal.component';

// 1. Importa la interfaz global para evitar duplicados incompatibles
import { type Doctor } from '../../interface/doctor.interface';

@Component({
  selector: 'app-lista-doctores',
  standalone: true,
  imports: [CommonModule, FormsModule, DetalleDoctorModalComponent],
  templateUrl: './lista-doctores.component.html',
})
export class ListaDoctoresComponent {
  search = signal<string>('');
  filtroEspecialidad = signal<string>('');
  sortField = signal<keyof Doctor>('apellido');
  sortAsc = signal<boolean>(true);
  selectedDoctor = signal<Doctor | null>(null);

  MOCK_DOCTORES = signal<Doctor[]>([
    {
      id: 1,
      nombre: 'Ricardo',
      apellido: 'Sánchez',
      especialidad: 'Cardiología',
      cmp: 'CMP-12345',
      telefono: '987 111 222',
      email: 'r.sanchez@clinica.com',
      turno: 'Mañana',
      estado: 'activo',
      rating: 4.8,
      pacientesAtendidos: 342,
      diasAtencion: ['Lun', 'Mié', 'Vie'],
    },
    {
      id: 2,
      nombre: 'Valentina',
      apellido: 'Rojas',
      especialidad: 'Pediatría',
      cmp: 'CMP-23456',
      telefono: '976 222 333',
      email: 'v.rojas@clinica.com',
      turno: 'Tarde',
      estado: 'activo',
      rating: 4.9,
      pacientesAtendidos: 518,
      diasAtencion: ['Lun', 'Mar', 'Jue', 'Vie'],
    },
    {
      id: 3,
      nombre: 'Marcos',
      apellido: 'Vega',
      especialidad: 'Traumatología',
      cmp: 'CMP-34567',
      telefono: '965 333 444',
      email: 'm.vega@clinica.com',
      turno: 'Completo',
      estado: 'activo',
      rating: 4.5,
      pacientesAtendidos: 210,
      diasAtencion: ['Mar', 'Jue'],
    },
    {
      id: 4,
      nombre: 'Patricia',
      apellido: 'Llanos',
      especialidad: 'Dermatología',
      cmp: 'CMP-45678',
      telefono: '954 444 555',
      email: 'p.llanos@clinica.com',
      turno: 'Mañana',
      estado: 'inactivo',
      rating: 4.3,
      pacientesAtendidos: 189,
      diasAtencion: ['Lun', 'Mié'],
    },
    {
      id: 5,
      nombre: 'Andrés',
      apellido: 'Castillo',
      especialidad: 'Neurología',
      cmp: 'CMP-56789',
      telefono: '943 555 666',
      email: 'a.castillo@clinica.com',
      turno: 'Tarde',
      estado: 'activo',
      rating: 4.7,
      pacientesAtendidos: 275,
      diasAtencion: ['Mar', 'Mié', 'Vie'],
    },
    {
      id: 6,
      nombre: 'Camila',
      apellido: 'Herrera',
      especialidad: 'Ginecología',
      cmp: 'CMP-67890',
      telefono: '932 666 777',
      email: 'c.herrera@clinica.com',
      turno: 'Mañana',
      estado: 'activo',
      rating: 4.9,
      pacientesAtendidos: 430,
      diasAtencion: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
    },
  ]);

  turnoColors: Record<string, string> = {
    Mañana: 'bg-amber-50 text-amber-700 border-amber-200',
    Tarde: 'bg-blue-50 text-blue-700 border-blue-200',
    Noche: 'bg-purple-50 text-purple-700 border-purple-200',
    Completo: 'bg-green-50 text-green-700 border-green-200',
  };

  especialidades = computed(() => {
    const lista = this.MOCK_DOCTORES().map((d) => d.especialidad);
    return [...new Set(lista)].sort();
  });

  stats = computed(() => [
    {
      title: 'Total Doctores',
      value: this.MOCK_DOCTORES().length,
      icon: 'groups',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Doctores Activos',
      value: this.MOCK_DOCTORES().filter((d) => d.estado === 'activo').length,
      icon: 'check_circle',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Nuevos (Mes)',
      value: 1,
      icon: 'person_add',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ]);

  filteredDoctores = computed(() => {
    const texto = this.search().toLowerCase();
    const esp = this.filtroEspecialidad();
    const campo = this.sortField();
    const ascendente = this.sortAsc();

    return this.MOCK_DOCTORES()
      .filter((d) => {
        const matchSearch = `${d.nombre} ${d.apellido} ${d.cmp} ${d.especialidad}`
          .toLowerCase()
          .includes(texto);
        const matchEsp = esp ? d.especialidad === esp : true;
        return matchSearch && matchEsp;
      })
      .sort((a, b) => {
        const av = String(a[campo]).toLowerCase();
        const bv = String(b[campo]).toLowerCase();
        return ascendente ? av.localeCompare(bv) : bv.localeCompare(av);
      });
  });

  handleSort(field: keyof Doctor): void {
    if (this.sortField() === field) {
      this.sortAsc.update((v) => !v);
    } else {
      this.sortField.set(field);
      this.sortAsc.set(true);
    }
  }

  selectDoctor(doctor: Doctor): void {
    this.selectedDoctor.set(doctor);
  }

  onDoctorUpdated(doctorActualizado: Doctor): void {
    this.MOCK_DOCTORES.update((lista) =>
      lista.map((d) => (d.id === doctorActualizado.id ? doctorActualizado : d)),
    );

    if (this.selectedDoctor()?.id === doctorActualizado.id) {
      this.selectedDoctor.set(doctorActualizado);
    }
  }
}
