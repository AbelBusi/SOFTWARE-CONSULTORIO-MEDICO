import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HorarioService } from '../../../clinica/horarios/services/horario.service';
import {
  HorarioTrabajoLeer,
  Disponibilidad,
  nombreDia,
} from '../../../clinica/horarios/models/horario.model';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './horario.component.html',
})
export class HorarioComponent implements OnInit {
  private horarioService = inject(HorarioService);
  private toastService = inject(ToastService);
  private platformId = inject(PLATFORM_ID);

  fecha = signal<string>('');
  horaInicio = signal<string>('');
  horaFin = signal<string>('');
  filtroTipo = signal<'todos' | 'DOCTOR' | 'RECEPCIONISTA'>('todos');

  consultando = signal<boolean>(false);
  yaConsultado = signal<boolean>(false);
  doctores = signal<Disponibilidad[]>([]);
  recepcionistas = signal<Disponibilidad[]>([]);

  horarios = signal<HorarioTrabajoLeer[]>([]);
  personaSeleccionada = signal<string>('');

  nombreDia = nombreDia;
  readonly today: string = new Date().toISOString().split('T')[0];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.horarioService.listar().subscribe({ next: (data) => this.horarios.set(data) });
    }
  }

  consultar(): void {
    if (!this.fecha() || !this.horaInicio() || !this.horaFin()) {
      this.toastService.warning('Seleccione fecha, hora de inicio y hora de fin.');
      return;
    }
    if (this.horaInicio() >= this.horaFin()) {
      this.toastService.warning('La hora de inicio debe ser menor a la hora de fin.');
      return;
    }

    this.consultando.set(true);
    this.horarioService.doctoresDisponibles(this.fecha(), this.horaInicio(), this.horaFin()).subscribe({
      next: (res) => {
        this.doctores.set(res);
        this.yaConsultado.set(true);
        this.consultando.set(false);
      },
      error: () => {
        this.toastService.error('No se pudo consultar la disponibilidad de doctores.');
        this.consultando.set(false);
      },
    });
    this.horarioService.recepcionistasDisponibles(this.fecha(), this.horaInicio(), this.horaFin()).subscribe({
      next: (res) => this.recepcionistas.set(res),
      error: () => this.toastService.error('No se pudo consultar la disponibilidad de recepcionistas.'),
    });
  }

  personas = computed(() => {
    const mapa = new Map<string, string>();
    for (const h of this.horarios()) {
      mapa.set(h.nombreCompleto, h.tipo);
    }
    return [...mapa.entries()]
      .map(([nombre, tipo]) => ({ nombre, tipo }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  });

  horarioPersona = computed(() => {
    const sel = this.personaSeleccionada();
    if (!sel) return [];
    return this.horarios()
      .filter((h) => h.nombreCompleto === sel)
      .sort((a, b) => a.diaSemana - b.diaSemana);
  });

  hora(valor: string): string {
    return (valor || '').slice(0, 5);
  }
}
