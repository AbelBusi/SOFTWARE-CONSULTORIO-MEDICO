import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CitaService } from '../../services/cita.service';
import { PacienteService } from '../../../pacientes/services/paciente.service';
import { DoctorService } from '../../../doctores/services/doctor.service';
import { RecepcionistaService } from '../../../recepcionistas/services/recepcionista.service';
import { EspecialidadService } from '../../../especialidad/services/especialidad.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { PacienteResumenDTO } from '../../../pacientes/interface/paciente.interface';
import { DoctorEspecialidadResumen } from '../../../doctores/interface/doctor.interface';
import { NombreRecepcionistaDTO } from '../../../recepcionistas/interface/recepcionista.interface';
import { NombreEspecialidadDTO } from '../../../especialidad/interface/especialidad.interface';
import { CitaMedicaCrearDTO } from '../../interface/cita.interface';

@Component({
  selector: 'app-crear-cita',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-cita.component.html',
})
export class CrearCitaComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly citaService = inject(CitaService);
  private readonly pacienteService = inject(PacienteService);
  private readonly doctorService = inject(DoctorService);
  private readonly recepcionistaService = inject(RecepcionistaService);
  private readonly especialidadService = inject(EspecialidadService);
  private readonly toast = inject(ToastService);
  private readonly destroy$ = new Subject<void>();

  form!: FormGroup;
  isSaving = false;

  pacientes: PacienteResumenDTO[] = [];
  recepcionistas: NombreRecepcionistaDTO[] = [];
  especialidades: NombreEspecialidadDTO[] = [];
  doctores: DoctorEspecialidadResumen[] = [];

  ngOnInit(): void {
    this.initForm();
    this.cargarDatosIniciales();
    this.escucharCambioEspecialidad();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.form = this.fb.group({
      recepcionistaId: ['', Validators.required],
      pacienteId: ['', Validators.required],
      especialidadId: ['', Validators.required],
      doctorId: ['', Validators.required],
      motivo: ['', [Validators.required, Validators.maxLength(500)]],
      fecha: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaSalida: ['', Validators.required],
      costo: ['', [Validators.required, Validators.min(0.01)]],
      estado: [1, Validators.required],
    });
  }

  private cargarDatosIniciales(): void {
    this.recepcionistaService
      .resumen()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.recepcionistas = Array.isArray(res) ? res : res?.object || [];
        },
        error: () => {
          this.toast.error('Error al cargar la lista de recepcionistas');
        },
      });

    this.pacienteService
      .resumen()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.pacientes = Array.isArray(res) ? res : res?.object || [];
        },
        error: () => {
          this.toast.error('Error al cargar la lista de pacientes');
        },
      });

    this.especialidadService
      .listarResumen()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.especialidades = Array.isArray(res) ? res : res?.object || [];
        },
        error: () => {
          this.toast.error('Error al cargar las especialidades');
        },
      });
  }

  private escucharCambioEspecialidad(): void {
    this.form
      .get('especialidadId')!
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((especialidadId) => {
        this.doctores = [];
        this.form.get('doctorId')!.setValue('', { emitEvent: false });

        if (especialidadId) {
          this.doctorService
            .listarPorEspecialidad(Number(especialidadId))
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (res: any) => {
                this.doctores = Array.isArray(res) ? res : res?.object || [];
                if (this.doctores.length === 0) {
                  this.toast.info('No hay doctores disponibles para esta especialidad');
                }
              },
              error: () => {
                this.toast.error('Error al cargar los doctores de la especialidad');
              },
            });
        }
      });
  }

  isInvalid(campo: string): boolean {
    const ctrl = this.form.get(campo);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.warning('Por favor, complete todos los campos obligatorios correctamente.');
      return;
    }

    this.isSaving = true;
    const value = this.form.getRawValue();

    const dto: CitaMedicaCrearDTO = {
      recepcionista: { id: Number(value.recepcionistaId) },
      paciente: { id: Number(value.pacienteId) },
      doctor: { id: Number(value.doctorId) },
      especialidad: { id: Number(value.especialidadId) },
      motivo: value.motivo,
      fecha: value.fecha,
      horaInicio: value.horaInicio,
      horaSalida: value.horaSalida,
      costo: Number(value.costo),
      estado: Number(value.estado),
    };

    this.citaService
      .crear(dto)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.isSaving = false;
          this.form.reset({ estado: 1 });
          this.doctores = [];
          this.toast.success(res?.mensaje || 'Cita médica registrada exitosamente');
        },
        error: (err) => {
          this.isSaving = false;
          const mensajeError = err.error?.mensaje || 'Ocurrió un error al registrar la cita médica';
          this.toast.error(mensajeError);
        },
      });
  }
}
