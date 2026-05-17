import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarPacienteModalComponent } from '../editar-paciente-modal/editar-paciente-modal.component';
import { type Paciente } from '../../interface/paciente.interface';

@Component({
  selector: 'app-detalle-paciente-modal',
  standalone: true,
  imports: [CommonModule, EditarPacienteModalComponent],
  templateUrl: './detalle-paciente-modal.component.html',
})
export class DetallePacienteModalComponent {
  paciente = input.required<Paciente>();
  close = output<void>();
  updatePaciente = output<Paciente>();

  editando = signal<boolean>(false);

  iniciales = computed(() => {
    const p = this.paciente();
    if (!p) return '';
    return `${p.nombre[0] ?? ''}${p.apellidos[0] ?? ''}`.toUpperCase();
  });

  quickStats = computed(() => {
    const p = this.paciente();
    return [
      { label: 'DNI', value: p.dni, icon: 'badge' },
      { label: 'Género', value: p.genero, icon: 'person' },
      { label: 'Seguro', value: p.entidadAseguradora, icon: 'assignment' },
    ];
  });

  contactoInfo = computed(() => {
    const p = this.paciente();
    return [
      { icon: 'phone', value: p.telefono },
      { icon: 'mail', value: p.correo },
      { icon: 'public', value: p.nacionalidad },
      { icon: 'calendar_month', value: `Nació el: ${p.fechaNacimiento}` },
    ];
  });

  handleSave(updated: Paciente): void {
    this.updatePaciente.emit(updated);
    this.editando.set(false);
  }
}
