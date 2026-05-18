import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { type Doctor } from '../../interface/doctor.interface';
import { EditarDoctorModalComponent } from '../editar-doctor-modal/editar-doctor-modal.component';

@Component({
  selector: 'app-detalle-doctor-modal',
  standalone: true,
  imports: [CommonModule, EditarDoctorModalComponent],
  templateUrl: './detalle-doctor-modal.component.html',
})
export class DetalleDoctorModalComponent implements OnChanges {
  @Input() doctor: Doctor | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() updateDoctor = new EventEmitter<Doctor>(); // Permite notificar los cambios al componente principal

  datos: Doctor | null = null;
  iniciales = '';
  editando = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['doctor'] && this.doctor) {
      this.datos = this.doctor;
      this.generarIniciales();
    }
  }

  generarIniciales(): void {
    if (this.datos) {
      this.iniciales = `${this.datos.nombre[0]}${this.datos.apellido[0]}`.toUpperCase();
    }
  }

  getTurnoClass(turno: string): string {
    switch (turno) {
      case 'Mañana':
        return 'bg-amber-500/30 text-amber-100';
      case 'Tarde':
        return 'bg-blue-500/30 text-blue-100';
      case 'Noche':
        return 'bg-indigo-500/30 text-indigo-100';
      default:
        return 'bg-purple-500/30 text-purple-100';
    }
  }

  handleClose(): void {
    this.close.emit();
  }

  abrirEdicion(): void {
    this.editando = true;
  }

  cerrarEdicion(): void {
    this.editando = false;
  }

  handleSave(doctorActualizado: Doctor): void {
    this.datos = doctorActualizado; // Actualiza la vista local del detalle inmediatamente
    this.generarIniciales();
    this.updateDoctor.emit(doctorActualizado); // Envía los datos actualizados a la lista principal (servidor/estado local)
  }
}
