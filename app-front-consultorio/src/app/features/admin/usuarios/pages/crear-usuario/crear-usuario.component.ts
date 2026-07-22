import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { RolService } from '../../services/rol.service';
import { Rol, UsuarioCrearDTO } from '../../models/usuario.model';
import { PersonaService, PersonaSinCuenta } from '../../../../../core/services/persona.service';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './crear-usuario.component.html',
})
export class CrearUsuarioComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private rolService = inject(RolService);
  private personaService = inject(PersonaService);
  private router = inject(Router);

  roles = signal<Rol[]>([]);
  personas = signal<PersonaSinCuenta[]>([]);
  loading = signal(false);
  alert = signal<{ type: 'success' | 'error'; msg: string } | null>(null);

  form = {
    personaId: 0,
    rolId: 0,
    usuario: '',
    claveAcceso: '',
  };

  ngOnInit(): void {
    this.rolService.listar().subscribe({
      next: (roles) => {
        const activos = roles.filter((r) => r.estado === 1);
        this.roles.set(activos);
        if (activos.length) this.form.rolId = activos[0].id;
      },
    });
    this.personaService.sinCuenta().subscribe({
      next: (personas) => this.personas.set(personas),
    });
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.form.personaId || !this.form.usuario || !this.form.claveAcceso || !this.form.rolId) {
      this.alert.set({ type: 'error', msg: 'Complete los campos obligatorios.' });
      return;
    }
    this.loading.set(true);
    const dto: UsuarioCrearDTO = {
      persona: { id: this.form.personaId },
      rol: { id: this.form.rolId },
      usuario: this.form.usuario,
      claveAcceso: this.form.claveAcceso,
      estado: 1,
    };
    this.usuarioService.crear(dto).subscribe({
      next: () => {
        this.alert.set({ type: 'success', msg: 'Usuario creado correctamente en la base de datos.' });
        setTimeout(() => this.router.navigate(['/dashboard/usuarios']), 1500);
      },
      error: () => {
        this.alert.set({ type: 'error', msg: 'No se pudo crear el usuario. Verifique que el nombre de usuario sea único.' });
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}
