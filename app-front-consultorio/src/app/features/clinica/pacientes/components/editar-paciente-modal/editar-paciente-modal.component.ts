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

  // Clonamos el objeto paciente dentro de un Signal modificable para el formulario
  form = signal<Paciente>({} as Paciente);
  saved = signal<boolean>(false);

  seguros = ['SIS', 'EsSalud', 'Rimac', 'Pacífico', 'Mapfre', 'Particular'];
  gruposSanguineos = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  ngOnInit(): void {
    // Inicialización limpia al montar el componente
    this.form.set({
      ...this.paciente(),
      alergias: [...this.paciente().alergias],
    });
  }

  iniciales = computed(() => {
    const f = this.form();
    if (!f.nombre || !f.apellido) return '';
    return `${f.nombre[0]}${f.apellido[0]}`.toUpperCase();
  });

  // Transformador bidireccional para mapear el string separado por comas al arreglo
  alergiasTexto = computed(() => {
    return this.form().alergias ? this.form().alergias.join(', ') : '';
  });

  onAlergiasChange(value: string): void {
    const list = value
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    this.form.update((f) => ({ ...f, alergias: list }));
  }

  handleSubmit(): void {
    this.save.emit(this.form());
    this.saved.set(true);

    setTimeout(() => {
      this.saved.set(false);
      this.close.emit();
    }, 1200);
  }
}
