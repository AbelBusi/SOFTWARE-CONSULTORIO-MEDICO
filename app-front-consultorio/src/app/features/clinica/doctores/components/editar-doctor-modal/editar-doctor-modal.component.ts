import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorDetalle } from '../../interface/doctor.interface';

@Component({
  selector: 'app-editar-doctor-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-doctor-modal.component.html',
})
export class EditarDoctorModalComponent implements OnChanges {
  @Input() doctor: DoctorDetalle | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<DoctorDetalle>();

  form: DoctorDetalle | null = null;
  saved = false;
  iniciales = '';

  // Propiedades locales para dar soporte al HTML existente y evitar errores TS2339
  turno = '';
  dias: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  diasSeleccionados: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];

  especialidades: string[] = [
    'Cardiología',
    'Dermatología',
    'Endocrinología',
    'Gastroenterología',
    'Geriatría',
    'Ginecología',
    'Medicina General',
    'Neurología',
    'Oftalmología',
    'Oncología',
    'Ortopedia',
    'Otorrinolaringología',
    'Pediatría',
    'Psiquiatría',
    'Traumatología',
    'Urología',
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['doctor'] && this.doctor) {
      this.form = {
        ...this.doctor,
        persona: { ...this.doctor.persona },
        especialidad: { ...this.doctor.especialidad },
      };

      // Intentar recuperar el turno si viene de alguna propiedad o dejarlo por defecto
      this.turno = (this.doctor as any).turno || 'Mañana';

      this.saved = false;
      this.generarIniciales();
    }
  }

  generarIniciales(): void {
    if (this.form?.persona) {
      const nombre = this.form.persona.nombre || '';
      const apellidos = this.form.persona.apellidos || '';
      this.iniciales = `${nombre[0] || ''}${apellidos[0] || ''}`.toUpperCase();
    }
  }

  isDiaActive(dia: string): boolean {
    return this.diasSeleccionados.includes(dia);
  }

  toggleDia(dia: string): void {
    const index = this.diasSeleccionados.indexOf(dia);
    if (index > -1) {
      this.diasSeleccionados.splice(index, 1);
    } else {
      this.diasSeleccionados.push(dia);
    }
  }

  handleClose(): void {
    this.close.emit();
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (!this.form) return;

    // Si tu backend en algún momento requiere el turno, se lo puedes inyectar aquí antes de emitir:
    // (this.form as any).turno = this.turno;

    this.save.emit(this.form);
    this.saved = true;

    setTimeout(() => {
      this.saved = false;
      this.close.emit();
    }, 1200);
  }
}
