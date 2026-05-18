import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteDetalleLeerDTO, PacienteActualizarDTO } from '../../interface/paciente.interface';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-editar-paciente-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-paciente-modal.component.html',
})
export class EditarPacienteModalComponent implements OnInit {
  private readonly pacienteService = inject(PacienteService);

  paciente = input.required<PacienteDetalleLeerDTO>();
  close = output<void>();
  save = output<PacienteDetalleLeerDTO>();

  // La señal del formulario manejará la estructura de actualización exacta
  form = signal<PacienteActualizarDTO>({} as PacienteActualizarDTO);
  guardando = signal<boolean>(false);

  seguros = ['SIS', 'ESSALUD', 'RIMAC', 'PACÍFICO', 'MAPFRE', 'PARTICULAR'];
  generos = ['MASCULINO', 'FEMENINO', 'OTRO'];

  ngOnInit(): void {
    const p = this.paciente();
    if (p) {
      // Mapeamos los datos de lectura al DTO de actualización limpio
      this.form.set({
        entidadAseguradora: p.entidadAseguradora,
        codigoAseguradora: p.codigoAseguradora,
        estado: 1, // Forzado
        persona: {
          dni: p.persona?.dni || '',
          nombre: p.persona?.nombre || '',
          apellidos: p.persona?.apellidos || '',
          fechaNacimiento: p.persona?.fechaNacimiento || '',
          genero: p.persona?.genero || '',
          telefono: p.persona?.telefono || '',
          nacionalidad: p.persona?.nacionalidad || '',
          correo: p.persona?.correo || '',
          estado: 1, // Forzado
        },
      });
    }
  }

  iniciales = computed(() => {
    const f = this.form();
    if (!f || !f.persona || !f.persona.nombre) return 'P';
    return f.persona.nombre[0].toUpperCase();
  });

  handleSubmit(): void {
    if (this.guardando()) return;

    this.guardando.set(true);
    const idPaciente = this.paciente().id;
    const payload = this.form();

    payload.estado = 1;
    payload.persona.estado = 1;

    this.pacienteService.actualizarPaciente(idPaciente, payload).subscribe({
      next: (pacienteActualizado) => {
        this.guardando.set(false);
        this.save.emit(pacienteActualizado);
        this.close.emit();
      },
      error: (err) => {
        this.guardando.set(false);
        console.error('Error al actualizar el paciente:', err);
      },
    });
  }
}
