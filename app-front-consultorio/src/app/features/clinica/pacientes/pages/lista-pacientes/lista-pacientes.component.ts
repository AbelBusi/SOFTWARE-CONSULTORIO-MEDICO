import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../interface/paciente.interface';
import { DetallePacienteModalComponent } from '../../components/detalle-paciente-modal/detalle-paciente-modal.component';

@Component({
  selector: 'app-lista-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule, DetallePacienteModalComponent],
  templateUrl: './lista-pacientes.component.html',
})
export class ListaPacientesComponent implements OnInit {
  private pacienteService = inject(PacienteService);
  private platformId = inject(PLATFORM_ID);

  search = signal<string>('');
  sortField = signal<keyof Paciente>('apellidos');
  sortAsc = signal<boolean>(true);
  selectedPaciente = signal<Paciente | null>(null);
  cargando = signal<boolean>(false);

  pacientesReal = signal<Paciente[]>([]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarPacientes();
    }
  }

  cargarPacientes(): void {
    this.cargando.set(true);
    this.pacienteService.listarPacientesActivos().subscribe({
      next: (res) => {
        this.pacientesReal.set(res.object || []);
        this.cargando.set(false);
      },
      error: () => {
        this.cargando.set(false);
      },
    });
  }

  stats = computed(() => [
    {
      title: 'Pacientes Activos',
      value: this.pacientesReal().length,
      icon: 'check_circle',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
  ]);

  filteredPacientes = computed(() => {
    const texto = this.search().toLowerCase();
    const campo = this.sortField();
    const ascendente = this.sortAsc();

    return this.pacientesReal()
      .filter((p) => `${p.nombre} ${p.apellidos} ${p.dni}`.toLowerCase().includes(texto))
      .sort((a, b) => {
        const av = String(a[campo] ?? '').toLowerCase();
        const bv = String(b[campo] ?? '').toLowerCase();
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
    this.pacientesReal.update((lista) =>
      lista.map((p) => (p.id === pacienteActualizado.id ? pacienteActualizado : p)),
    );

    if (this.selectedPaciente()?.id === pacienteActualizado.id) {
      this.selectedPaciente.set(pacienteActualizado);
    }
  }
}
