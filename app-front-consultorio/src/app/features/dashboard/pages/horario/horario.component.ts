import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TurnoMedico {
  id: number;
  doctor: string;
  especialidad: string;
  hora: string;
  estado: 'ocupado' | 'disponible' | 'emergencia' | 'receso';
  paciente?: string;
}

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horario.component.html',
})
export class HorarioComponent {
  cargando = signal<boolean>(false);

  totalTurnos = signal<number>(24);
  horasAsignadas = signal<number>(72);
  doctoresActivos = signal<number>(5);
  alertas = signal<number>(0);

  // Sistema de navegación perpetua por semanas
  fechaPivot = signal<Date>(new Date());
  doctorSeleccionado = signal<string>('todos');

  horas = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];

  // Calcula dinámicamente los días de la semana activa en base al pivot
  diasSemana = computed(() => {
    const pivot = new Date(this.fechaPivot());
    const diaSemana = pivot.getDay();
    const diferencia = diaSemana === 0 ? -6 : 1 - diaSemana;

    const lunes = new Date(pivot.setDate(pivot.getDate() + diferencia));
    const nombres = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    return nombres.map((nombre, index) => {
      const fechaDia = new Date(lunes);
      fechaDia.setDate(lunes.getDate() + index);
      return {
        nombre,
        numero: fechaDia.getDate(),
        llave: fechaDia.toISOString().split('T')[0],
      };
    });
  });

  rangoSemana = computed(() => {
    const dias = this.diasSemana();
    const opciones: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const inicio = new Date(dias[0].llave).toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'short',
    });
    const fin = new Date(dias[dias.length - 1].llave).toLocaleDateString('es-PE', opciones);
    return `${inicio} - ${fin}`;
  });

  // Base de datos de turnos indexada por 'Fecha-Hora'
  private baseTurnos = signal<Record<string, TurnoMedico>>({
    '2026-05-27-08:00': {
      id: 1,
      doctor: 'Dr. Carlos Mendoza',
      especialidad: 'Pediatría',
      hora: '08:00',
      estado: 'ocupado',
      paciente: 'Liam Guerrero',
    },
    '2026-05-27-09:00': {
      id: 1,
      doctor: 'Dr. Carlos Mendoza',
      especialidad: 'Pediatría',
      hora: '09:00',
      estado: 'ocupado',
      paciente: 'Thiago Palacios',
    },
    '2026-05-28-11:00': {
      id: 2,
      doctor: 'Dra. Ana Silva',
      especialidad: 'Cardiología',
      hora: '11:00',
      estado: 'emergencia',
      paciente: 'Sofía Benítes',
    },
    '2026-05-29-14:00': {
      id: 3,
      doctor: 'Dr. Luis Torres',
      especialidad: 'Dermatología',
      hora: '14:00',
      estado: 'disponible',
    },
    '2026-05-29-12:00': {
      id: 4,
      doctor: 'Dra. Elena Rostova',
      especialidad: 'Ginecología',
      hora: '12:00',
      estado: 'receso',
    },
  });

  turnosFiltrados = computed(() => {
    const doctor = this.doctorSeleccionado();
    const todos = this.baseTurnos();
    if (doctor === 'todos') return todos;

    const filtrados: Record<string, TurnoMedico> = {};
    for (const key in todos) {
      if (todos[key].doctor === doctor) {
        filtrados[key] = todos[key];
      }
    }
    return filtrados;
  });

  getTurno(fechaLlave: string, hora: string): TurnoMedico | null {
    return this.turnosFiltrados()[`${fechaLlave}-${hora}`] || null;
  }

  navegarSemana(semanas: number) {
    const nuevaFecha = new Date(this.fechaPivot());
    nuevaFecha.setDate(nuevaFecha.getDate() + semanas * 7);
    this.fechaPivot.set(nuevaFecha);
  }

  irHoy() {
    this.fechaPivot.set(new Date());
  }
}
