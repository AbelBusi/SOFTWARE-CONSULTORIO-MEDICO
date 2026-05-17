import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-especialidad-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-especialidad-modal.component.html',
})
export class CrearEspecialidadModalComponent {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  // Podrías agregar un objeto para el formulario si deseas capturar los datos
  especialidadForm = {
    nombre: '',
    descripcion: '',
    piso: '1er Piso',
    demanda: 'Baja',
  };

  handleClose() {
    this.onClose.emit();
  }

  onSubmit() {
    console.log('Datos guardados:', this.especialidadForm);
    // Aquí iría la lógica para llamar a un servicio
    this.handleClose();
  }
}
