import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core'; // <-- Importa NgZone
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Especialidad } from '../../interface/especialidad.interface';
import { EspecialidadService } from '../../services/especialidad.service';
import { ToastService } from '../../../../../core/services/toast.service';
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
  private _search = '';
  get search(): string {
    return this._search;
  }
  set search(value: string) {
    this._search = value;
    this.paginaActual = 1;
  }

  sortField: keyof Especialidad = 'nombre';
  sortAsc = true;

  paginaActual = 1;
  filasPorPagina = 5;

  isCrearOpen = false;
  especialidadVer: Especialidad | null = null;
  especialidadEditar: Especialidad | null = null;
  especialidadSeleccionada: Especialidad | null = null;

  especialidades: Especialidad[] = [];
  cargando = false;

  constructor(
    private readonly especialidadService: EspecialidadService,
    private readonly toastService: ToastService,
    private readonly cdr: ChangeDetectorRef,
    private readonly zone: NgZone, // <-- Inyéctalo aquí en el constructor
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

  handleEspecialidadCreada(): void {
    this.especialidadSeleccionada = null;
    this.cargarEspecialidades();
  }

  handleEspecialidadEditada(especialidadActualizada: Especialidad): void {
    const index = this.especialidades.findIndex((e) => e.id === especialidadActualizada.id);
    if (index !== -1) {
      this.especialidades[index] = { ...especialidadActualizada };
      this.especialidades = [...this.especialidades];
    }
    this.especialidadSeleccionada = null;
    this.especialidadEditar = null;
    this.cdr.detectChanges();
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
    this.paginaActual = 1;
  }

  get totalFiltrados(): number {
    return this.especialidades.filter((e) => {
      const term = this.search.toLowerCase();
      return e.nombre?.toLowerCase().includes(term) || e.descripcion?.toLowerCase().includes(term);
    }).length;
  }

  get totalPaginas(): number {
    return Math.ceil(this.totalFiltrados / this.filasPorPagina) || 1;
  }

  get filteredEspecialidades(): Especialidad[] {
    const filtrados = this.especialidades
      .filter((e) => {
        const term = this.search.toLowerCase();
        const nombreMatch = e.nombre?.toLowerCase().includes(term) || false;
        const descriptionMatch = e.descripcion?.toLowerCase().includes(term) || false;
        return nombreMatch || descriptionMatch;
      })
      .sort((a, b) => {
        const av = String(a[this.sortField] ?? '').toLowerCase();
        const bv = String(b[this.sortField] ?? '').toLowerCase();
        return this.sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      });

    const inicio = (this.paginaActual - 1) * this.filasPorPagina;
    const fin = inicio + this.filasPorPagina;
    return filtrados.slice(inicio, fin);
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      this.especialidadSeleccionada = null;
      this.cdr.detectChanges();
    }
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

  eliminarEspecialidad(id: number): void {
    if (this.cargando) return;

    this.toastService.confirmar(
      'Desactivar Especialidad',
      '¿Estás seguro de que deseas desactivar esta especialidad?',
    ).then((confirmar) => {
      if (!confirmar) return;

      this.zone.run(() => {
        this.cargando = true;

        this.especialidadService.eliminarPorId(id).subscribe({
          next: (response) => {
            this.toastService.success(response.mensaje || 'Especialidad desactivada con éxito');

            this.especialidades = this.especialidades.filter((e) => e.id !== id);

            if (this.paginaActual > this.totalPaginas) {
              this.paginaActual = this.totalPaginas;
            }

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
    });
  }}
