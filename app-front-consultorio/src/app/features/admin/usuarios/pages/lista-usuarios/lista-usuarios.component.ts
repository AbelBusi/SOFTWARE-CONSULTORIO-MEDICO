import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { RolService } from '../../services/rol.service';
import { UsuarioLeer, Rol } from '../../models/usuario.model';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './lista-usuarios.component.html',
})
export class ListaUsuariosComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private rolService = inject(RolService);

  usuarios = signal<UsuarioLeer[]>([]);
  roles = signal<Rol[]>([]);
  cargando = signal(true);
  search = signal('');

  ngOnInit(): void {
    this.rolService.listar().subscribe({ next: (r) => this.roles.set(r) });
    this.usuarioService.listar().subscribe({
      next: (data) => {
        this.usuarios.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  nombreRol(rolId: number): string {
    return this.roles().find((r) => r.id === rolId)?.nombre ?? `Rol #${rolId}`;
  }

  filtered = computed(() => {
    const q = this.search().toLowerCase();
    return this.usuarios().filter((u) =>
      `${u.usuario} ${u.persona?.id}`.toLowerCase().includes(q),
    );
  });
}
