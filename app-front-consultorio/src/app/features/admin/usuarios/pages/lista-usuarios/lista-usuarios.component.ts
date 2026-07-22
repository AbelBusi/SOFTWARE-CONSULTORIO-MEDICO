import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioLeer } from '../../models/usuario.model';
import { CustomTableComponent } from '../../../../../shared/components/custom-table/custom-table.component';
import { TableColumn } from '../../../../../shared/components/custom-table/table-column.interface';
import { ToastService } from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CustomTableComponent],
  templateUrl: './lista-usuarios.component.html',
})
export class ListaUsuariosComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private toastService = inject(ToastService);

  usuarios = signal<UsuarioLeer[]>([]);
  cargando = signal(true);
  search = signal('');
  sortField = signal<string>('usuario');
  sortAsc = signal<boolean>(true);

  columnas: TableColumn<UsuarioLeer>[] = [
    { header: 'Usuario', field: 'usuario', sortable: true, type: 'custom' },
    { header: 'Nombre', field: 'nombre', sortable: true, type: 'custom' },
    { header: 'Correo', field: 'correo', sortable: false, type: 'custom' },
    { header: 'Rol', field: 'nombreRol', sortable: false, type: 'custom' },
    { header: 'Estado', field: 'estado', sortable: false, type: 'custom' },
    { header: 'Acciones', field: 'acciones', sortable: false, type: 'actions' },
  ];

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.usuarioService.listar('ACTIVO').subscribe({
      next: (data) => {
        this.usuarios.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  stats = computed(() => {
    const lista = this.usuarios();
    const roles = new Set(lista.map((u) => u.nombreRol));
    return [
      { title: 'Usuarios activos', value: lista.length, icon: 'manage_accounts', bg: 'bg-teal-50', color: 'text-teal-600' },
      { title: 'Roles', value: roles.size, icon: 'badge', bg: 'bg-sky-50', color: 'text-sky-600' },
    ];
  });

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const campo = this.sortField() as keyof UsuarioLeer;
    const asc = this.sortAsc();
    return this.usuarios()
      .filter((u) =>
        `${u.usuario} ${u.nombre} ${u.correo} ${u.nombreRol}`.toLowerCase().includes(q),
      )
      .sort((a, b) => {
        const av = String(a[campo] ?? '').toLowerCase();
        const bv = String(b[campo] ?? '').toLowerCase();
        return asc ? av.localeCompare(bv) : bv.localeCompare(av);
      });
  });

  handleSort(field: string): void {
    if (this.sortField() === field) {
      this.sortAsc.update((v) => !v);
    } else {
      this.sortField.set(field);
      this.sortAsc.set(true);
    }
  }

  desactivar(usuario: UsuarioLeer): void {
    this.toastService
      .confirmar(
        'Desactivar usuario',
        `¿Estás seguro de que deseas desactivar la cuenta "${usuario.usuario}"?`,
      )
      .then((confirmar) => {
        if (!confirmar) return;
        this.usuarioService.eliminar(usuario.id).subscribe({
          next: (res) => {
            this.toastService.success(res?.mensaje || 'Usuario desactivado con éxito');
            this.usuarios.set(this.usuarios().filter((u) => u.id !== usuario.id));
          },
          error: () => this.toastService.error('Hubo un error al desactivar el usuario'),
        });
      });
  }
}
