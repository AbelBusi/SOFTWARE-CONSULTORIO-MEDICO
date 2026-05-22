import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RecepcionistaService } from '../../services/recepcionista.service';
import { RecepcionistaLeer } from '../../models/recepcionista.model';

@Component({
  selector: 'app-lista-recepcionistas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './lista-recepcionistas.component.html',
})
export class ListaRecepcionistasComponent implements OnInit {
  private recepcionistaService = inject(RecepcionistaService);

  recepcionistas = signal<RecepcionistaLeer[]>([]);
  cargando = signal(true);
  search = signal('');
  filtroEstado = signal<'todos' | 'ACTIVO' | 'INACTIVO'>('todos');

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    const estado = this.filtroEstado();
    const req =
      estado === 'todos'
        ? this.recepcionistaService.listar()
        : this.recepcionistaService.listar(estado);
    req.subscribe({
      next: (data) => {
        this.recepcionistas.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  onFiltroChange(): void {
    this.cargar();
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este recepcionista?')) return;
    this.recepcionistaService.eliminar(id).subscribe({
      next: () => this.cargar(),
    });
  }

  stats = computed(() => [
    {
      title: 'Total',
      value: this.recepcionistas().length,
      icon: 'support_agent',
      color: 'text-teal-600',
      bg: 'bg-teal-50',
    },
    {
      title: 'Activos',
      value: this.recepcionistas().filter((r) => r.estado === 1).length,
      icon: 'check_circle',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
  ]);

  filtered = computed(() => {
    const q = this.search().toLowerCase();
    return this.recepcionistas().filter((r) =>
      `${r.nombre} ${r.apellidos} ${r.codigoEmpleado}`.toLowerCase().includes(q),
    );
  });
}
