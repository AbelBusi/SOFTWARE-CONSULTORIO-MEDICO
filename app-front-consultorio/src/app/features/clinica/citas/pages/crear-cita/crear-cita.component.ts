import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cita',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-cita.component.html',
})
export class CrearCitaComponent implements OnInit {
  citaForm!: FormGroup;
  especialidades: any[] = [];
  doctores: any[] = [];
  recepcionistas: any[] = [];
  loading = false;

  paises = [
    'Argentina',
    'Bolivia',
    'Brasil',
    'Chile',
    'Colombia',
    'Costa Rica',
    'Cuba',
    'Ecuador',
    'El Salvador',
    'España',
    'Estados Unidos',
    'Guatemala',
    'Honduras',
    'México',
    'Nicaragua',
    'Panamá',
    'Paraguay',
    'Perú',
    'República Dominicana',
    'Uruguay',
    'Venezuela',
  ];

  constructor(private fb: FormBuilder) {}

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
      costo: [0, [Validators.required, Validators.min(0)]],
      estado: [1],
      recepcionista: this.fb.group({
        id: [0, [Validators.required, Validators.min(1)]],
      }),
      doctor: this.fb.group({
        id: [0, [Validators.required, Validators.min(1)]],
      }),
      especialidad: this.fb.group({
        id: [0, [Validators.required, Validators.min(1)]],
      }),
      paciente: this.fb.group({
        entidadAseguradora: [''],
        codigoAseguradora: [''],
        estado: [1],
        persona: this.fb.group({
          dni: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
          nombre: ['', [Validators.required]],
          apellidos: ['', [Validators.required]],
          fechaNacimiento: [''],
          genero: [''],
          telefono: [''],
          nacionalidad: [''],
          correo: [''],
          estado: [1],
        }),
      }),
    });
  }

  private loadCatalogos(): void {
    Promise.all([
      fetch('http://localhost:8088/api/v1/especialidades/resumen'),
      fetch('http://localhost:8088/api/v1/doctores/resumen'),
      fetch('http://localhost:8088/api/v1/recepcionistas/resumen'),
    ])
      .then(async ([resEsp, resDoc, resRec]) => {
        const dEsp = await resEsp.json();
        const dDoc = await resDoc.json();
        const dRec = await resRec.json();

        this.especialidades = dEsp.object || [];
        this.doctores = dDoc.object || [];
        this.recepcionistas = dRec.object || [];
      })
      .catch(() => {
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron cargar los catálogos.' });
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
    const bodyData = this.citaForm.value;

    fetch('http://localhost:8088/api/v1/citas-medicas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    })
      .then((res) => {
        if (res.ok) {
          Swal.fire({ icon: 'success', title: '¡Cita Registrada!', confirmButtonColor: '#15803d' });
          this.initForm();
        } else {
          Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo procesar la solicitud.' });
        }
      })
      .catch(() => {
        Swal.fire({ icon: 'error', title: 'Error de servidor' });
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
