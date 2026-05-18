import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CatalogoService, ResumenItem } from '../../../../../core/services/catalogo.service';
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-crear-cita',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-cita.component.html',
})
export class CrearCitaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private catalogoService = inject(CatalogoService);
  private citaService = inject(CitaService);
  private router = inject(Router);

  citaForm!: FormGroup;
  pacientes: ResumenItem[] = [];
  doctores: ResumenItem[] = [];
  especialidades: ResumenItem[] = [];
  recepcionistas: ResumenItem[] = [];
  loading = false;

  ngOnInit(): void {
    this.initForm();
    this.loadCatalogos();
  }

  private initForm(): void {
    this.citaForm = this.fb.group({
      motivo: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaSalida: ['', [Validators.required]],
      costo: [0, [Validators.required, Validators.min(1)]],
      estado: [1],
      recepcionistaId: [0, [Validators.required, Validators.min(1)]],
      doctorId: [0, [Validators.required, Validators.min(1)]],
      especialidadId: [0, [Validators.required, Validators.min(1)]],
      pacienteId: [0, [Validators.required, Validators.min(1)]],
    });
  }

  private loadCatalogos(): void {
    this.catalogoService.cargarCatalogosCita().subscribe({
      next: ({ pacientes, doctores, especialidades, recepcionistas }) => {
        this.pacientes = pacientes;
        this.doctores = doctores;
        this.especialidades = especialidades;
        this.recepcionistas = recepcionistas;
      },
      error: () => {
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron cargar los catálogos.' });
      },
    });
  }

  hasError(controlPath: string): boolean {
    const control = this.citaForm.get(controlPath);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  get costoActual(): number {
    const costo = this.citaForm.get('costo')?.value;
    return costo ? Number(costo) : 0;
  }

  get valuePreview() {
    return {
      fecha: this.citaForm.get('fecha')?.value,
      horaInicio: this.citaForm.get('horaInicio')?.value,
    };
  }

  handleSubmit(): void {
    if (this.citaForm.invalid) {
      this.citaForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const v = this.citaForm.value;

    this.citaService
      .crear({
        motivo: v.motivo,
        fecha: v.fecha,
        horaInicio: v.horaInicio,
        horaSalida: v.horaSalida,
        costo: v.costo,
        estado: v.estado,
        recepcionista: { id: v.recepcionistaId },
        doctor: { id: v.doctorId },
        especialidad: { id: v.especialidadId },
        paciente: { id: v.pacienteId },
      })
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Cita registrada',
            confirmButtonColor: '#0f766e',
          }).then(() => this.router.navigate(['/dashboard/citas']));
        },
        error: () => {
          Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo registrar la cita.' });
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
