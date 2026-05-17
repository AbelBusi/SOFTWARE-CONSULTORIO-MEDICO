import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { type Doctor } from '../../doctor.interface';

@Component({
  selector: 'app-editar-doctor-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-doctor-modal.component.html',
})
export class EditarDoctorModalComponent implements OnChanges {
  @Input() doctor: Doctor | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Doctor>();

  form: Doctor | null = null;
  saved = false;
  iniciales = '';

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

  dias: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['doctor'] && this.doctor) {
      this.form = { ...this.doctor, diasAtencion: [...this.doctor.diasAtencion] };
      this.saved = false;
      this.generarIniciales();
    }
  }

  generarIniciales(): void {
    if (this.form && this.form.nombre && this.form.apellido) {
      this.iniciales = `${this.form.nombre[0]}${this.form.apellido[0]}`.toUpperCase();
    }
  }

  isDiaActive(dia: string): boolean {
    return this.form?.diasAtencion.includes(dia) ?? false;
  }

  toggleDia(dia: string): void {
    if (!this.form) return;

    const index = this.form.diasAtencion.indexOf(dia);
    if (index > -1) {
      this.form.diasAtencion.splice(index, 1);
    } else {
      this.form.diasAtencion.push(dia);
    }
  }

  handleClose(): void {
    this.close.emit();
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (!this.form) return;

    this.save.emit(this.form);
    this.saved = true;

    setTimeout(() => {
      this.saved = false;
      this.close.emit();
    }, 1200);
  }
}
