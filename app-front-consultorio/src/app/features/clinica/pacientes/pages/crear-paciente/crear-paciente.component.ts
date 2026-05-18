import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { ReniecService } from '../../services/reniec.service';
import { PacienteCrearDTO } from '../../interface/paciente.interface';

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
  private readonly pacienteService = inject(PacienteService);
  private readonly reniecService = inject(ReniecService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  loading = false;
  alert: AlertData | null = null;
  private alertTimeout: any;

  form: PacienteCrearDTO = this.getInitialForm();

  seguros = ['SIS', 'ESSALUD', 'RIMAC', 'PACÍFICO', 'MAPFRE', 'PARTICULAR'];
  generos = ['MASCULINO', 'FEMENINO', 'OTRO'];

  inputCls =
    'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all';
  selectCls = `${this.inputCls} appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:1em_1em]`;

  getInitialForm(): PacienteCrearDTO {
    return {
      entidadAseguradora: '',
      codigoAseguradora: '',
      estado: 1,
      persona: {
        dni: '',
        nombre: '',
        apellidos: '',
        fechaNacimiento: '',
        genero: '',
        telefono: '',
        nacionalidad: 'Peruana',
        correo: '',
        estado: 1,
      },
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
        this.cdr.markForCheck();
      }, 5000);
    }
    this.cdr.markForCheck();
  }

  closeAlert() {
    this.alert = null;
    if (this.alertTimeout) clearTimeout(this.alertTimeout);
    this.cdr.markForCheck();
  }

  handleConsultarDNI() {
    const dniDestino = this.form.persona.dni;

    if (!dniDestino || dniDestino.length !== 8) {
      this.showAlert('warning', 'El DNI debe tener exactamente 8 dígitos.');
      return;
    }

    this.loading = true;

    this.reniecService.consultarDni(dniDestino).subscribe({
      next: (datosMapeados) => {
        this.loading = false;

        if (datosMapeados) {
          this.form.persona = {
            ...this.form.persona,
            nombre: datosMapeados.nombre,
            apellidos: datosMapeados.apellidos,
          };
          this.showAlert('success', 'Datos cargados desde RENIEC.');
        } else {
          this.showAlert('error', 'No se encontraron registros para el DNI ingresado.');
        }

        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al consultar DNI:', err);
        this.showAlert('error', 'Error al conectar con el servicio de RENIEC.');

        this.cdr.markForCheck();
      },
    });
  }

  handleSubmit() {
    this.loading = true;

    this.form.estado = 1;
    this.form.persona.estado = 1;

    this.pacienteService.crearPaciente(this.form).subscribe({
      next: () => {
        this.loading = false;
        this.showAlert('success', 'Paciente registrado correctamente.');
        this.form = this.getInitialForm();

        setTimeout(() => {
          this.router.navigate(['/pacientes']);
        }, 1500);

        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        this.showAlert('error', 'Hubo un problema al guardar el registro en el servidor.');

        this.cdr.markForCheck();
      },
    });
  }
}
