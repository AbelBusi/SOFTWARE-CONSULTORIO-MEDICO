import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
<<<<<<< HEAD
import { ReniecService } from '../../../../../core/services/reniec.service';
import { ToastService } from '../../../../../core/services/toast.service';
=======
>>>>>>> 7103b47 (avance frontend implementacion recepcionista y roles)
import { PacienteCrearDTO } from '../../interface/paciente.interface';
import { ConsultaDniComponent } from '../../../../../shared/components/consulta-dni/consulta-dni.component';
import { DatosPersonaReniec } from '../../../../../core/services/reniec.service';

@Component({
  selector: 'app-crear-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule, ConsultaDniComponent],
  templateUrl: './crear-paciente.component.html',
})
export class CrearPacienteComponent {
  private readonly pacienteService = inject(PacienteService);
<<<<<<< HEAD
  private readonly reniecService = inject(ReniecService);
  private readonly toastService = inject(ToastService);
=======
>>>>>>> 7103b47 (avance frontend implementacion recepcionista y roles)
  private readonly router = inject(Router);

  loading = false;
<<<<<<< HEAD
  isSaving = false; // Maneja la pantalla de carga global post-guardado
=======
  alert: AlertData | null = null;
  private alertTimeout: ReturnType<typeof setTimeout> | null = null;

>>>>>>> 7103b47 (avance frontend implementacion recepcionista y roles)
  form: PacienteCrearDTO = this.getInitialForm();

  seguros = ['SIS', 'ESSALUD', 'RIMAC', 'PACÍFICO', 'MAPFRE', 'PARTICULAR'];
  generos = ['MASCULINO', 'FEMENINO', 'OTRO'];

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

<<<<<<< HEAD
  fechaMaxima(): string {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  }

  handleConsultarDNI() {
    const dniDestino = this.form.persona.dni;

    if (!dniDestino || dniDestino.length !== 8) {
      this.toastService.warning('El DNI debe tener exactamente 8 dígitos.');
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
          this.toastService.success('Datos cargados desde RENIEC.');
        } else {
          this.toastService.error('No se encontraron registros para el DNI ingresado.');
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al consultar DNI:', err);
        const msgError = err.error?.mensaje || 'Error al conectar con el servicio de RENIEC.';
        this.toastService.error(msgError);
      },
    });
  }

  handleSubmit() {
    if (!this.form.persona.dni.trim() || !this.form.persona.nombre.trim() || !this.form.persona.apellidos.trim()) {
      this.toastService.warning('Por favor, complete todos los campos obligatorios.');
      return;
    }

=======
  onDatosReniec(datos: DatosPersonaReniec) {
    this.form.persona = {
      ...this.form.persona,
      dni: datos.dni,
      nombre: datos.nombre,
      apellidos: datos.apellidos,
    };
    this.showAlert('success', 'Datos cargados desde RENIEC.');
  }

  showAlert(type: 'success' | 'error' | 'warning' | 'info', msg: string) {
    if (this.alertTimeout) clearTimeout(this.alertTimeout);
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

  handleSubmit() {
>>>>>>> 7103b47 (avance frontend implementacion recepcionista y roles)
    this.loading = true;
    this.form.estado = 1;
    this.form.persona.estado = 1;

    this.pacienteService.crearPaciente(this.form).subscribe({
      next: (response: any) => {
        this.loading = false;
<<<<<<< HEAD
        this.isSaving = true;

        const mensajeExito = response?.mensaje || 'Paciente registrado correctamente.';
        this.toastService.success(mensajeExito);


        setTimeout(() => {
          this.router.navigate(['/pacientes']);
        }, 1800);
      },
      error: (err) => {
        this.loading = false;
        this.isSaving = false;
        console.error('Error al guardar el paciente:', err);

        const mensajeError = err.error?.mensaje || 'Hubo un problema al guardar el registro en el servidor.';
        this.toastService.error(mensajeError);
=======
        this.showAlert('success', 'Paciente registrado correctamente en la base de datos.');
        this.form = this.getInitialForm();
        setTimeout(() => this.router.navigate(['/dashboard/pacientes']), 1500);
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        this.showAlert('error', 'Hubo un problema al guardar el registro en el servidor.');
        this.cdr.markForCheck();
>>>>>>> 7103b47 (avance frontend implementacion recepcionista y roles)
      },
    });
  }

  handleLimpiarFormulario() {
    this.form = this.getInitialForm();
    this.toastService.info('Formulario restablecido.');
  }
}
