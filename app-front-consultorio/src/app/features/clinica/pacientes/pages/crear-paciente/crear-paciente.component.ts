import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FormData {
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string;
  sexo: string;
  telefono: string;
  email: string;
  direccion: string;
  seguro: string;
  grupoSanguineo: string;
  alergias: string;
  observaciones: string;
}

interface AlertData {
  type: 'success' | 'error' | 'warning' | 'info';
  msg: string;
}

@Component({
  selector: 'app-crear-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-paciente.component.html',
})
export class CrearPacienteComponent {
  form: FormData = this.getInitialForm();
  loading = false;
  alert: AlertData | null = null;
  private alertTimeout: any;

  inputCls =
    'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all';
  selectCls = `${this.inputCls} appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:1em_1em]`;

  private getInitialForm(): FormData {
    return {
      nombre: '',
      apellido: '',
      dni: '',
      fechaNacimiento: '',
      sexo: '',
      telefono: '',
      email: '',
      direccion: '',
      seguro: '',
      grupoSanguineo: '',
      alergias: '',
      observaciones: '',
    };
  }

  showAlert(type: 'success' | 'error' | 'warning' | 'info', msg: string) {
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }

    this.alert = { type, msg };

    if (type === 'success' || type === 'info') {
      this.alertTimeout = setTimeout(() => {
        this.alert = null;
      }, 5000);
    }
  }

  closeAlert() {
    this.alert = null;
    if (this.alertTimeout) clearTimeout(this.alertTimeout);
  }

  handleConsultarDNI() {
    if (this.form.dni.length !== 8) {
      this.showAlert('warning', 'El DNI debe tener 8 dígitos.');
      return;
    }

    this.loading = true;

    setTimeout(() => {
      if (this.form.dni === '12345678') {
        this.showAlert('error', 'El paciente ya existe en el sistema.');
        this.loading = false;
      } else {
        this.form = {
          ...this.form,
          nombre: 'CARLOS ALBERTO',
          apellido: 'RODRIGUEZ SOSA',
          direccion: 'CALLE LAS MAGNOLIAS 450, LIMA',
          email: 'c.rodriguez@email.com',
        };
        this.showAlert('success', 'Datos cargados desde RENIEC.');
        this.loading = false;
      }
    }, 1200);
  }

  handleSubmit() {
    this.showAlert('success', 'Paciente registrado correctamente.');
    this.form = this.getInitialForm();
  }
}
