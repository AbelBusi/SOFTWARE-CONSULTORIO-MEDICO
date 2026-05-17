import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Especialidad } from '../../interface/especialidad.interface';
import { VerDetalleEspecialidadModalComponent } from '../../components/ver-detalle-especialidad-modal/ver-detalle-especialidad-modal.component';
import { CrearEspecialidadModalComponent } from '../../components/crear-especialidad-modal/crear-especialidad-modal.component';
import { EditarEspecialidadModalComponent } from '../../components/editar-especialidad-modal/editar-especialidad-modal.component';

@Component({
  selector: 'app-lista-especialidad',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    VerDetalleEspecialidadModalComponent,
    CrearEspecialidadModalComponent,
    EditarEspecialidadModalComponent,
  ],
  templateUrl: './lista-especialidad.component.html',
})
export class ListaEspecialidadComponent {
  search = '';
  sortField: keyof Especialidad = 'nombre';
  sortAsc = true;

  isCrearOpen = false;
  especialidadVer: Especialidad | null = null;
  especialidadEditar: Especialidad | null = null;
  especialidadSeleccionada: Especialidad | null = null;

  mockEspecialidades: Especialidad[] = [
    {
      id: 1,
      nombre: 'Cardiología',
      descripcion: 'Enfermedades del corazón y sistema circulatorio',
      numDoctores: 5,
      estado: 'activo',
      demanda: 'Alta',
      piso: '2do Piso',
    },
    {
      id: 2,
      nombre: 'Pediatría',
      descripcion: 'Atención médica para niños y adolescentes',
      numDoctores: 8,
      estado: 'activo',
      demanda: 'Alta',
      piso: '1er Piso',
    },
    {
      id: 3,
      nombre: 'Dermatología',
      descripcion: 'Cuidado de la piel, cabello y uñas',
      numDoctores: 3,
      estado: 'activo',
      demanda: 'Media',
      piso: '3er Piso',
    },
    {
      id: 4,
      nombre: 'Ginecología',
      descripcion: 'Salud del sistema reproductor femenino',
      numDoctores: 4,
      estado: 'activo',
      demanda: 'Media',
      piso: '2do Piso',
    },
    {
      id: 5,
      nombre: 'Oftalmología',
      descripcion: 'Tratamientos y cirugía ocular',
      numDoctores: 2,
      estado: 'inactivo',
      demanda: 'Baja',
      piso: '4to Piso',
    },
    {
      id: 6,
      nombre: 'Neurología',
      descripcion: 'Trastornos del sistema nervioso',
      numDoctores: 3,
      estado: 'activo',
      demanda: 'Alta',
      piso: '3er Piso',
    },
  ];

  get totalEspecialidades(): number {
    return this.mockEspecialidades.length;
  }

  get totalEspecialistas(): number {
    return this.mockEspecialidades.reduce((acc, curr) => acc + curr.numDoctores, 0);
  }

  get altaDemandaCount(): number {
    return this.mockEspecialidades.filter((e) => e.demanda === 'Alta').length;
  }

  handleSort(field: keyof Especialidad) {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }
  }

  get filteredEspecialidades(): Especialidad[] {
    return this.mockEspecialidades
      .filter((e) => `${e.nombre} ${e.piso}`.toLowerCase().includes(this.search.toLowerCase()))
      .sort((a, b) => {
        const av = String(a[this.sortField]).toLowerCase();
        const bv = String(b[this.sortField]).toLowerCase();
        return this.sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      });
  }

  seleccionarEspecialidad(e: Especialidad) {
    this.especialidadSeleccionada = this.especialidadSeleccionada?.id === e.id ? null : e;
  }

  setEspecialidadVer(e: Especialidad) {
    this.especialidadVer = e;
  }

  setEspecialidadEditar(e: Especialidad) {
    this.especialidadEditar = e;
  }
}
