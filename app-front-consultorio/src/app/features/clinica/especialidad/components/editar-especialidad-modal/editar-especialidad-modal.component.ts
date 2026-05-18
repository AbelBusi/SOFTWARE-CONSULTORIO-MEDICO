import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Especialidad } from '../../interface/especialidad.interface';

@Component({
  selector: 'app-editar-especialidad-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-especialidad-modal.component.html',
})
export class EditarEspecialidadModalComponent implements OnChanges {
  @Input() especialidad: Especialidad | null = null;
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  especialidadForm: Partial<Especialidad> = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['especialidad'] && this.especialidad) {
      this.especialidadForm = { ...this.especialidad };
    }
  }

  handleClose() {
    this.onClose.emit();
  }

  onSubmit() {
    console.log('Datos actualizados:', this.especialidadForm);
    this.handleClose();
  }
}
