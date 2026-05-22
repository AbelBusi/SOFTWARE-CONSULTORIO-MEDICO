import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CitaService } from '../../../clinica/citas/services/cita.service';
import { DoctorService } from '../../../clinica/doctores/services/doctor.service';
import { PacienteService } from '../../../clinica/pacientes/services/paciente.service';
import { EspecialidadService } from '../../../clinica/especialidad/services/especialidad.service';
import { CitaMedica } from '../../../clinica/citas/models/cita.model';
import { CitaMedicaLeer } from '../../../clinica/citas/interface/cita.interface';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.component.html',
})
export class InicioComponent implements OnInit {
  private citaService = inject(CitaService);
  private doctorService = inject(DoctorService);
  private pacienteService = inject(PacienteService);
  private especialidadService = inject(EspecialidadService);

  cargando = signal(true);
  totalPacientes = signal(0);
  totalDoctores = signal(0);
  totalCitas = signal(0);
  citasHoy = signal(0);
  totalEspecialidades = signal(0);

  accesosRapidos = [
    {
      titulo: 'Nueva cita',
      desc: 'Agendar consulta médica',
      icon: 'calendar_today',
      ruta: '/dashboard/citas/nuevo',
      color: 'bg-teal-600',
    },
    {
      titulo: 'Nuevo paciente',
      desc: 'Registrar paciente',
      icon: 'person_add',
      ruta: '/dashboard/pacientes/nuevo',
      color: 'bg-sky-600',
    },
    {
      titulo: 'Nuevo doctor xd',
      desc: 'Alta de especialista',
      icon: 'medical_services',
      ruta: '/dashboard/doctores/nuevo',
      color: 'bg-emerald-600',
    },
    {
      titulo: 'Especialidades',
      desc: 'Gestionar áreas médicas',
      icon: 'local_hospital',
      ruta: '/dashboard/especialidades',
      color: 'bg-cyan-700',
    },
  ];

  ngOnInit(): void {
    forkJoin({
      pacientes: this.pacienteService.listarPacientes(),
      doctores: this.doctorService.listar(),
      citas: this.citaService.listar(),
      especialidades: this.especialidadService.listarActivos(),
    }).subscribe({
      next: ({ pacientes, doctores, citas, especialidades }) => {
        this.totalPacientes.set(pacientes.length);
        this.totalDoctores.set(doctores.length);
        this.totalCitas.set(8);
        this.totalEspecialidades.set(especialidades.object?.length ?? 0);

        const hoy = new Date().toISOString().slice(0, 10);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }
}
