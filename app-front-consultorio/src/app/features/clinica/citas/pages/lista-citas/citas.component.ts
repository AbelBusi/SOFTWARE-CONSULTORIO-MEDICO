import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CitaService } from '../../services/cita.service';
import { CitaMedica } from '../../models/cita.model';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './citas.component.html',
})
export class CitasComponent implements OnInit {
  private citaService = inject(CitaService);

  citas: CitaMedica[] = [];
  cargando = true;
  search = '';
  filterEstado: null | number = null;
  sortField: keyof CitaMedica = 'diaConsulta';
  sortAsc = true;

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.cargando = true;
    this.citaService.listar().subscribe({
      next: (data) => {
        this.citas = data;
        this.cargando = false;
      },
      error: () => {
        this.citas = [];
        this.cargando = false;
      },
    });
  }

  get totalCitas(): number {
    return this.citas.length;
  }

  get pendientesCount(): number {
    return this.citas.filter((c) => c.estado !== 1).length;
  }

  get completadasCount(): number {
    return this.citas.filter((c) => c.estado === 1).length;
  }

  handleSort(field: keyof CitaMedica): void {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }
  }

  setFilterEstado(val: null | number): void {
    this.filterEstado = val;
  }

  get filteredCitas(): CitaMedica[] {
    return this.citas
      .filter((c) => {
        const matchSearch =
          `${c.nombrePaciente} ${c.apellidosPaciente} ${c.nombreDoctor} ${c.especialidad}`
            .toLowerCase()
            .includes(this.search.toLowerCase());
        const matchEstado = this.filterEstado === null || c.estado === this.filterEstado;
        return matchSearch && matchEstado;
      })
      .sort((a, b) => {
        const av = String(a[this.sortField]).toLowerCase();
        const bv = String(b[this.sortField]).toLowerCase();
        return this.sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      });
  }

  getIniciales(cita: CitaMedica): string {
    const pN = cita.nombrePaciente ? cita.nombrePaciente[0] : '';
    const pA = cita.apellidosPaciente ? cita.apellidosPaciente[0] : '';
    return `${pN}${pA}`.toUpperCase();
  }

  formatearFecha(fechaStr: string): string {
    if (!fechaStr) return '';
    return new Date(fechaStr).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
