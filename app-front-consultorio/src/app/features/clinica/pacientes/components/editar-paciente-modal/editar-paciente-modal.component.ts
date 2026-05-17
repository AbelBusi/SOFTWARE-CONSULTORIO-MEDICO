import { Component, computed, input, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { type Paciente } from '../../interface/paciente.interface';

@Component({
  selector: 'app-editar-paciente-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-paciente-modal.component.html',
})
export class EditarPacienteModalComponent implements OnInit {
  paciente = input.required<Paciente>();
  close = output<void>();
  save = output<Paciente>();

  form = signal<Paciente>({} as Paciente);
  saved = signal<boolean>(false);

  // Lista de aseguradoras adaptada
  seguros = ['SIS', 'EsSalud', 'Rimac', 'Pacífico', 'Mapfre', 'Particular'];

  ngOnInit(): void {
    this.form.set({
      ...this.paciente(),
    });
  }

  iniciales = computed(() => {
    const f = this.form();
    if (!f.nombre || !f.apellidos) return '';
    return `${f.nombre[0] ?? ''}${f.apellidos[0] ?? ''}`.toUpperCase();
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
