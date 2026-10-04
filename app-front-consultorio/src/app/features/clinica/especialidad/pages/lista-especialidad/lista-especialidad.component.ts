import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Especialidad } from '../../interface/especialidad.interface';
import { EspecialidadService } from '../../services/especialidad.service';
import { ToastService } from '../../../../../core/services/toast.service';

import { VerDetalleEspecialidadModalComponent } from '../../components/ver-detalle-especialidad-modal/ver-detalle-especialidad-modal.component';
import { CrearEspecialidadModalComponent } from '../../components/crear-especialidad-modal/crear-especialidad-modal.component';
import { EditarEspecialidadModalComponent } from '../../components/editar-especialidad-modal/editar-especialidad-modal.component';

import { CustomTableComponent } from '../../../../../shared/components/custom-table/custom-table.component';
import { TableColumn } from '../../../../../shared/components/custom-table/table-column.interface';

@Component({
  selector: 'app-lista-especialidad',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CustomTableComponent,
    VerDetalleEspecialidadModalComponent,
    CrearEspecialidadModalComponent,
    EditarEspecialidadModalComponent,
  ],
  templateUrl: './lista-especialidad.component.html',
})
export class ListaEspecialidadComponent implements OnInit {
  search = '';
  especialidades: Especialidad[] = [];
  cargando = false;
  isCrearOpen = false;
  especialidadVer: Especialidad | null = null;
  especialidadEditar: Especialidad | null = null;
  especialidadSeleccionada: Especialidad | null = null;
  sortField = 'nombre';

  columns: TableColumn<Especialidad>[] = [
    {
      header: 'Especialidad',
      field: 'nombre',
      sortable: true,
      type: 'custom',
    },
    {
      header: 'Descripción',
      field: 'descripcion',
      type: 'text',
    },
    {
      header: 'Estado',
      field: 'estado',
      type: 'custom',
    },
    {
      header: 'Acciones',
      field: 'id',
      type: 'actions',
    },
  ];

  constructor(
    private readonly especialidadService: EspecialidadService,
    private readonly toastService: ToastService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  cargarEspecialidades(): void {
    this.cargando = true;

    this.especialidadService.listarActivos().subscribe({
      next: (response) => {
        this.especialidades = response.object || [];
        this.cargando = false;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error al cargar especialidades desde la API:', error);

        this.toastService.error('No se pudieron cargar las especialidades del servidor.');

        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  get especialidadesFiltradas(): Especialidad[] {
    const term = this.search.trim().toLowerCase();

    if (!term) {
      return this.especialidades;
    }

    return this.especialidades.filter(
      (especialidad) =>
        especialidad.nombre?.toLowerCase().includes(term) ||
        especialidad.descripcion?.toLowerCase().includes(term),
    );
  }

  get totalEspecialidades(): number {
    return this.especialidades.length;
  }

  handleSort(field: string): void {
    this.sortField = field;
  }

  seleccionarEspecialidad(especialidad: Especialidad): void {
    this.especialidadSeleccionada =
      this.especialidadSeleccionada?.id === especialidad.id ? null : especialidad;
  }

  setEspecialidadVer(especialidad: Especialidad): void {
    this.especialidadVer = especialidad;
  }

  setEspecialidadEditar(especialidad: Especialidad): void {
    this.especialidadEditar = especialidad;
  }

  handleEspecialidadCreada(): void {
    this.especialidadSeleccionada = null;
    this.cargarEspecialidades();
  }

  handleEspecialidadEditada(especialidadActualizada: Especialidad): void {
    const index = this.especialidades.findIndex((e) => e.id === especialidadActualizada.id);

    if (index !== -1) {
      this.especialidades[index] = {
        ...especialidadActualizada,
      };

      this.especialidades = [...this.especialidades];
    }

    this.especialidadSeleccionada = null;
    this.especialidadEditar = null;

    this.cdr.detectChanges();
  }

  eliminarEspecialidad(especialidad: Especialidad): void {
    if (this.cargando) {
      return;
    }

    this.toastService
      .confirmar(
        'Desactivar Especialidad',
        '¿Estás seguro de que deseas desactivar esta especialidad?',
      )
      .then((confirmar) => {
        if (!confirmar) {
          return;
        }

        this.cargando = true;

        this.especialidadService.eliminarPorId(especialidad.id).subscribe({
          next: (response) => {
            this.toastService.success(response.mensaje || 'Especialidad desactivada con éxito');

            this.especialidades = this.especialidades.filter((e) => e.id !== especialidad.id);

            this.especialidadSeleccionada = null;

            this.cargando = false;

            this.cdr.detectChanges();
          },

          error: (error) => {
            console.error(error);

            this.toastService.error('Hubo un error al desactivar la especialidad');

            this.cargando = false;

            this.cdr.detectChanges();
          },
        });
      });
  }
}
