import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { DoctorLeer } from '../../models/doctor.model';

@Component({
  selector: 'app-lista-doctores',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './lista-doctores.component.html',
})
export class ListaDoctoresComponent implements OnInit {
  private doctorService = inject(DoctorService);

  doctores = signal<DoctorLeer[]>([]);
  cargando = signal(true);
  search = signal<string>('');
  filtroEspecialidad = signal<string>('');
  sortField = signal<keyof DoctorLeer>('apellidos');
  sortAsc = signal<boolean>(true);

  ngOnInit(): void {
    this.doctorService.listar().subscribe({
      next: (data) => {
        this.doctores.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  especialidades = computed(() => {
    const lista = this.doctores().map((d) => d.especialidad);
    return [...new Set(lista)].sort();
  });

  stats = computed(() => [
    {
      title: 'Total Doctores',
      value: this.doctores().length,
      icon: 'groups',
      color: 'text-teal-600',
      bg: 'bg-teal-50',
    },
    {
      title: 'Activos',
      value: this.doctores().filter((d) => d.estado === 1).length,
      icon: 'check_circle',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Especialidades',
      value: this.especialidades().length,
      icon: 'local_hospital',
      color: 'text-sky-600',
      bg: 'bg-sky-50',
    },
  ]);

  filteredDoctores = computed(() => {
    const texto = this.search().toLowerCase();
    const esp = this.filtroEspecialidad();
    const campo = this.sortField();
    const ascendente = this.sortAsc();

    return this.doctores()
      .filter((d) => {
        const matchSearch = `${d.nombre} ${d.apellidos} ${d.cpm} ${d.especialidad}`
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

  handleSort(field: keyof DoctorLeer): void {
    if (this.sortField() === field) {
      this.sortAsc.update((v) => !v);
    } else {
      this.sortField.set(field);
      this.sortAsc.set(true);
    }
  }
}
