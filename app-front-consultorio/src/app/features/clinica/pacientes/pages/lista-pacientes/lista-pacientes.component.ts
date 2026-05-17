import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetallePacienteModalComponent } from '../../components/detalle-paciente-modal/detalle-paciente-modal.component';

export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string;
  edad: number;
  sexo: string;
  telefono: string;
  email: string;
  direccion: string;
  seguro: string;
  grupoSanguineo: string;
  alergias: string[];
  ultimaCita: string;
  estado: 'activo' | 'inactivo';
}

@Component({
  selector: 'app-lista-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule, DetallePacienteModalComponent],
  templateUrl: './lista-pacientes.component.html',
})
export class ListaPacientesComponent {
  search = signal<string>('');
  sortField = signal<keyof Paciente>('apellido');
  sortAsc = signal<boolean>(true);
  selectedPaciente = signal<Paciente | null>(null);

  MOCK_PACIENTES = signal<Paciente[]>([
    {
      id: 1,
      nombre: 'María',
      apellido: 'García',
      dni: '12345678',
      fechaNacimiento: '1985-03-12',
      edad: 39,
      sexo: 'Femenino',
      telefono: '987 654 321',
      email: 'maria.garcia@email.com',
      direccion: 'Av. Larco 450, Miraflores',
      seguro: 'SIS',
      grupoSanguineo: 'O+',
      alergias: ['Penicilina'],
      ultimaCita: '15 abr 2026',
      estado: 'activo',
    },
    {
      id: 2,
      nombre: 'Carlos',
      apellido: 'Mendoza',
      dni: '87654321',
      fechaNacimiento: '1990-07-22',
      edad: 34,
      sexo: 'Masculino',
      telefono: '976 543 210',
      email: 'c.mendoza@email.com',
      direccion: 'Jr. Unión 123, Lima',
      seguro: 'EsSalud',
      grupoSanguineo: 'A+',
      alergias: [],
      ultimaCita: '02 abr 2026',
      estado: 'activo',
    },
    {
      id: 3,
      nombre: 'Ana',
      apellido: 'Torres',
      dni: '45678912',
      fechaNacimiento: '1978-11-05',
      edad: 46,
      sexo: 'Femenino',
      telefono: '965 432 109',
      email: 'ana.torres@email.com',
      direccion: 'Calle Las Flores 89, San Isidro',
      seguro: 'Rimac',
      grupoSanguineo: 'B-',
      alergias: ['Aspirina', 'Ibuprofeno'],
      ultimaCita: '28 mar 2026',
      estado: 'activo',
    },
    {
      id: 4,
      nombre: 'Luis',
      apellido: 'Ramírez',
      dni: '32165498',
      fechaNacimiento: '2000-01-30',
      edad: 25,
      sexo: 'Masculino',
      telefono: '954 321 098',
      email: 'luis.ramirez@email.com',
      direccion: 'Av. Brasil 77, Breña',
      seguro: 'Pacífico',
      grupoSanguineo: 'AB+',
      alergias: ['Látex'],
      ultimaCita: '10 mar 2026',
      estado: 'inactivo',
    },
    {
      id: 5,
      nombre: 'Sofía',
      apellido: 'Chávez',
      dni: '65498732',
      fechaNacimiento: '1995-06-18',
      edad: 29,
      sexo: 'Femenino',
      telefono: '943 210 987',
      email: 'sofia.chavez@email.com',
      direccion: 'Calle Lima 200, Surco',
      seguro: 'SIS',
      grupoSanguineo: 'O-',
      alergias: [],
      ultimaCita: '20 abr 2026',
      estado: 'activo',
    },
    {
      id: 6,
      nombre: 'Roberto',
      apellido: 'Flores',
      dni: '11223344',
      fechaNacimiento: '1965-09-14',
      edad: 59,
      sexo: 'Masculino',
      telefono: '932 109 876',
      email: 'r.flores@email.com',
      direccion: 'Jr. Puno 55, Cercado',
      seguro: 'EsSalud',
      grupoSanguineo: 'A-',
      alergias: ['Sulfa'],
      ultimaCita: '05 abr 2026',
      estado: 'activo',
    },
  ]);

  stats = computed(() => [
    {
      title: 'Total Pacientes',
      value: this.MOCK_PACIENTES().length,
      icon: 'groups',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Pacientes Activos',
      value: this.MOCK_PACIENTES().filter((p) => p.estado === 'activo').length,
      icon: 'check_circle',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Nuevos (Mes)',
      value: 2,
      icon: 'person_add',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ]);

  filteredPacientes = computed(() => {
    const texto = this.search().toLowerCase();
    const campo = this.sortField();
    const ascendente = this.sortAsc();

    return this.MOCK_PACIENTES()
      .filter((p) => `${p.nombre} ${p.apellido} ${p.dni}`.toLowerCase().includes(texto))
      .sort((a, b) => {
        const av = String(a[campo]).toLowerCase();
        const bv = String(b[campo]).toLowerCase();
        return ascendente ? av.localeCompare(bv) : bv.localeCompare(av);
      });
  });

  handleSort(field: keyof Paciente): void {
    if (this.sortField() === field) {
      this.sortAsc.update((v) => !v);
    } else {
      this.sortField.set(field);
      this.sortAsc.set(true);
    }
  }

  selectPaciente(paciente: Paciente): void {
    this.selectedPaciente.set(paciente);
  }

  onPacienteUpdated(pacienteActualizado: Paciente): void {
    this.MOCK_PACIENTES.update((lista) =>
      lista.map((p) => (p.id === pacienteActualizado.id ? pacienteActualizado : p)),
    );

    if (this.selectedPaciente()?.id === pacienteActualizado.id) {
      this.selectedPaciente.set(pacienteActualizado);
    }
  }
}
