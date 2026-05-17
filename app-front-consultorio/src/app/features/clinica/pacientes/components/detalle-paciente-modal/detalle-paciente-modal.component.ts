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
  // Inputs y Outputs reactivos basados en la API de Angular 17+
  paciente = input.required<Paciente>();
  close = output<void>();
  updatePaciente = output<Paciente>();

  editando = signal<boolean>(false);

  iniciales = computed(() => {
    const p = this.paciente();
    if (!p) return '';
    return `${p.nombre[0]}${p.apellido[0]}`.toUpperCase();
  });

  quickStats = computed(() => {
    const p = this.paciente();
    return [
      { label: 'DNI', value: p.dni, icon: 'badge' },
      { label: 'Sangre', value: p.grupoSanguineo, icon: 'favorite' },
      { label: 'Seguro', value: p.seguro, icon: 'assignment' },
    ];
  });

  contactoInfo = computed(() => {
    const p = this.paciente();
    return [
      { icon: 'phone', value: p.telefono },
      { icon: 'mail', value: p.email },
      { icon: 'location_on', value: p.direccion },
      { icon: 'calendar_month', value: `Última cita: ${p.ultimaCita}` },
    ];
  });

  handleSave(updated: Paciente): void {
    this.updatePaciente.emit(updated);
    this.editando.set(false);
  }
}
