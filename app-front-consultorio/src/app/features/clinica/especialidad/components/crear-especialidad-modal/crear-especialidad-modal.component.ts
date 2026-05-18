import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EspecialidadService } from '../../services/especialidad.service';
import { EspecialidadCrearDTO } from '../../interface/especialidad.interface';

@Component({
  selector: 'app-crear-especialidad-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-especialidad-modal.component.html',
})
export class CrearEspecialidadModalComponent {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onEspecialidadCreada = new EventEmitter<void>();

  especialidadForm: EspecialidadCrearDTO = {
    nombre: '',
    descripcion: '',
    estado: 1, // Por defecto 1 (Activo) según tu backend
  };

  constructor(private readonly especialidadService: EspecialidadService) {}

  handleClose() {
    this.resetForm();
    this.onClose.emit();
  }

  private resetForm() {
    this.especialidadForm = {
      nombre: '',
      descripcion: '',
      estado: 1,
    };
  }

  onSubmit() {
    if (!this.especialidadForm.nombre.trim() || !this.especialidadForm.descripcion.trim()) {
      return;
    }

    this.especialidadService.crear(this.especialidadForm).subscribe({
      next: () => {
        this.onEspecialidadCreada.emit();
        this.handleClose();
      },
      error: (error) => {
        console.error('Error al guardar la especialidad:', error);
      },
    });
  }
}
