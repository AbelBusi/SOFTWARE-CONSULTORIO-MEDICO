import { Component, computed, input, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { type PacienteDetalleLeerDTO } from '../../interface/paciente.interface'; // Usa el DTO detallado

@Component({
  selector: 'app-editar-paciente-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-paciente-modal.component.html',
})
export class EditarPacienteModalComponent implements OnInit {
  paciente = input.required<PacienteDetalleLeerDTO>(); // Tipo corregido
  close = output<void>();
  save = output<PacienteDetalleLeerDTO>(); // Tipo corregido

  form = signal<PacienteDetalleLeerDTO>({} as PacienteDetalleLeerDTO); // Tipo corregido
  saved = signal<boolean>(false);

  seguros = ['SIS', 'EsSalud', 'Rimac', 'Pacífico', 'Mapfre', 'Particular'];

  ngOnInit(): void {
    this.form.set({
      ...this.paciente(),
    });
  }

  iniciales = computed(() => {
    const f = this.form();
    if (!f || !f.persona || !f.persona.nombre || !f.persona.apellidos) return '';
    return `${f.persona.nombre[0]}${f.persona.apellidos[0]}`.toUpperCase();
  });

  handleSubmit(): void {
    this.save.emit(this.form());
    this.saved.set(true);

    setTimeout(() => {
      this.saved.set(false);
      this.close.emit();
    }, 1200);
  }
}
