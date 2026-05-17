import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../services/paciente.service';
import { PacienteInterface, PacienteDetalleLeerDTO } from '../../interface/paciente.interface';
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
  sortField = signal<keyof PacienteInterface>('paciente');
  sortAsc = signal<boolean>(true);

  selectedPaciente = signal<PacienteDetalleLeerDTO | null>(null);
  cargando = signal<boolean>(false);

  pacientesReal = signal<PacienteInterface[]>([]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarPacientes();
    }
  }

  cargarPacientes(): void {
    this.cargando.set(true);
    this.pacienteService.listarPacientes('ACTIVO').subscribe({
      next: (pacientes) => {
        this.pacientesReal.set(pacientes);
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
      .filter((p) => `${p.paciente} ${p.dni}`.toLowerCase().includes(texto))
      .sort((a, b) => {
        const av = String(a[campo] ?? '').toLowerCase();
        const bv = String(b[campo] ?? '').toLowerCase();
        return ascendente ? av.localeCompare(bv) : bv.localeCompare(av);
      });
  });

  handleSort(field: keyof PacienteInterface): void {
    if (this.sortField() === field) {
      this.sortAsc.update((v) => !v);
    } else {
      this.sortField.set(field);
      this.sortAsc.set(true);
    }
  }

  selectPaciente(paciente: PacienteInterface): void {
    this.pacienteService.traerPacientePorId(paciente.id).subscribe({
      next: (pacienteDetalle) => {
        this.selectedPaciente.set(pacienteDetalle);
      },
      error: (err) => {
        console.error('Error al obtener los detalles del paciente:', err);
      },
    });
  }

  onPacienteUpdated(pacienteActualizado: PacienteDetalleLeerDTO): void {
    this.pacientesReal.update((lista) =>
      lista.map((p) =>
        p.id === pacienteActualizado.id
          ? {
              ...p,
              paciente: `${pacienteActualizado.persona.nombre} ${pacienteActualizado.persona.apellidos}`,
              dni: pacienteActualizado.persona.dni,
              entidadAseguradora: pacienteActualizado.entidadAseguradora,
              estado: pacienteActualizado.estado,
            }
          : p,
      ),
    );

    if (this.selectedPaciente()?.id === pacienteActualizado.id) {
      this.selectedPaciente.set(pacienteActualizado);
    }
  }
}
