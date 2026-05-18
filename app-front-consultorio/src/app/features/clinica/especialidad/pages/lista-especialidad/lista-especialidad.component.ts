import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Especialidad } from '../../interface/especialidad.interface';
import { EspecialidadService } from '../../services/especialidad.service';
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
export class ListaEspecialidadComponent implements OnInit {
  search = '';
  sortField: keyof Especialidad = 'nombre';
  sortAsc = true;

  isCrearOpen = false;
  especialidadVer: Especialidad | null = null;
  especialidadEditar: Especialidad | null = null;
  especialidadSeleccionada: Especialidad | null = null;

  especialidades: Especialidad[] = [];
  cargando = false;

  constructor(private readonly especialidadService: EspecialidadService) {}

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  cargarEspecialidades(): void {
    this.cargando = true;
    this.especialidadService.listarActivos().subscribe({
      next: (response) => {
        this.especialidades = response.object;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar especialidades desde la API:', error);
        this.cargando = false;
      },
    });
  }

  get totalEspecialidades(): number {
    return this.especialidades.length;
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
    return this.especialidades
      .filter((e) => {
        const term = this.search.toLowerCase();
        const nombreMatch = e.nombre?.toLowerCase().includes(term) || false;
        const descripcionMatch = e.descripcion?.toLowerCase().includes(term) || false;
        return nombreMatch || descripcionMatch;
      })
      .sort((a, b) => {
        const av = String(a[this.sortField] ?? '').toLowerCase();
        const bv = String(b[this.sortField] ?? '').toLowerCase();
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
