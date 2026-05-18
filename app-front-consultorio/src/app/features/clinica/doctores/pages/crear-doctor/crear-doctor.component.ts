import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { CatalogoService, ResumenItem } from '../../../../../core/services/catalogo.service';

@Component({
  selector: 'app-crear-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-doctor.component.html',
})
export class CrearDoctorComponent implements OnInit {
  private doctorService = inject(DoctorService);
  private catalogoService = inject(CatalogoService);
  private router = inject(Router);

  especialidades = signal<ResumenItem[]>([]);
  loading = signal(false);
  alert = signal<{ type: 'success' | 'error'; msg: string } | null>(null);

  form = {
    cpm: '',
    rne: '',
    consejoRegional: 'CMP Lima',
    foto: 'default.jpg',
    dni: '',
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
    genero: 'Masculino',
    telefono: '',
    nacionalidad: 'Peruana',
    correo: '',
    especialidadId: 0,
    estado: 1,
  };

  ngOnInit(): void {
    this.catalogoService.especialidadesResumen().subscribe({
      next: (data) => this.especialidades.set(data),
    });
  }

  showAlert(type: 'success' | 'error', msg: string) {
    this.alert.set({ type, msg });
    if (type === 'success') setTimeout(() => this.alert.set(null), 4000);
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.form.cpm || !this.form.nombre || !this.form.apellidos || !this.form.dni || !this.form.especialidadId) {
      this.showAlert('error', 'Complete los campos obligatorios.');
      return;
    }

    this.loading.set(true);
    this.doctorService
      .crear({
        cpm: this.form.cpm,
        rne: this.form.rne || undefined,
        consejoRegional: this.form.consejoRegional,
        foto: this.form.foto,
        persona: {
          dni: this.form.dni,
          nombre: this.form.nombre,
          apellidos: this.form.apellidos,
          fechaNacimiento: this.form.fechaNacimiento,
          genero: this.form.genero,
          telefono: this.form.telefono,
          nacionalidad: this.form.nacionalidad,
          correo: this.form.correo,
          estado: 1,
        },
        especialidad: { id: this.form.especialidadId },
        estado: this.form.estado,
      })
      .subscribe({
        next: () => {
          this.showAlert('success', 'Doctor registrado correctamente.');
          setTimeout(() => this.router.navigate(['/dashboard/doctores']), 1500);
        },
        error: () => this.showAlert('error', 'No se pudo registrar el doctor.'),
        complete: () => this.loading.set(false),
      });
  }
}
