import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CitaMedica {
  id: number;
  nombrePaciente: string;
  apellidosPaciente: string;
  motivoConsulta: string;
  especialidad: string;
  diaConsulta: string;
  horaInicio: string;
  horaSalida: string;
  nombreDoctor: string;
  estado: number; // 0: Pendiente, 1: Completada
}

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.component.html',
})
export class CitasComponent implements OnInit {
  citas: CitaMedica[] = [];
  search = '';
  filterEstado: null | number = null;
  sortField: keyof CitaMedica = 'diaConsulta';
  sortAsc = true;

  ngOnInit(): void {
    fetch('http://localhost:8088/api/v1/citas-medicas')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.object)) {
          this.citas = data.object;
        } else {
          this.citas = [];
        }
      })
      .catch((err) => console.error('Error cargando citas:', err));
  }

  get totalCitas(): number {
    return this.citas.length;
  }

  get pendientesCount(): number {
    return this.citas.filter((c) => c.estado === 0).length;
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
