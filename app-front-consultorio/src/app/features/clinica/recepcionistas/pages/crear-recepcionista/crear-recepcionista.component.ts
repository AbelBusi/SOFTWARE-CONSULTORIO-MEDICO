import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RecepcionistaService } from '../../services/recepcionista.service';
import { RecepcionistaCrearDTO } from '../../models/recepcionista.model';
import { ConsultaDniComponent } from '../../../../../shared/components/consulta-dni/consulta-dni.component';
import { DatosPersonaReniec } from '../../../../../core/services/reniec.service';

@Component({
  selector: 'app-crear-recepcionista',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ConsultaDniComponent],
  templateUrl: './crear-recepcionista.component.html',
})
export class CrearRecepcionistaComponent {
  private recepcionistaService = inject(RecepcionistaService);
  private router = inject(Router);

  loading = signal(false);
  alert = signal<{ type: 'success' | 'error'; msg: string } | null>(null);

  form: RecepcionistaCrearDTO = {
    codigoEmpleado: '',
    estado: 1,
    persona: {
      dni: '',
      nombre: '',
      apellidos: '',
      fechaNacimiento: '',
      genero: 'Femenino',
      telefono: '',
      nacionalidad: 'Peruana',
      correo: '',
      estado: 1,
    },
  };

  generos = ['Masculino', 'Femenino', 'Otro'];

  onDatosReniec(datos: DatosPersonaReniec) {
    this.form.persona = {
      ...this.form.persona,
      dni: datos.dni,
      nombre: datos.nombre,
      apellidos: datos.apellidos,
    };
    this.alert.set({ type: 'success', msg: 'Datos cargados desde RENIEC.' });
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.form.codigoEmpleado || !this.form.persona.dni || !this.form.persona.nombre) {
      this.alert.set({ type: 'error', msg: 'Complete los campos obligatorios.' });
      return;
    }
    this.loading.set(true);
    this.recepcionistaService.crear(this.form).subscribe({
      next: () => {
        this.alert.set({ type: 'success', msg: 'Recepcionista registrado correctamente en la base de datos.' });
        setTimeout(() => this.router.navigate(['/dashboard/recepcionistas']), 1500);
      },
      error: () => this.alert.set({ type: 'error', msg: 'No se pudo registrar el recepcionista.' }),
      complete: () => this.loading.set(false),
    });
  }
}
