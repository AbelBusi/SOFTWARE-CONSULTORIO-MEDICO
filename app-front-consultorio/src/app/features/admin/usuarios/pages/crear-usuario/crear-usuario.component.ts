import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { RolService } from '../../services/rol.service';
import { Rol, UsuarioCrearCompleto } from '../../models/usuario.model';
import { ConsultaDniComponent } from '../../../../../shared/components/consulta-dni/consulta-dni.component';
import { DatosPersonaReniec } from '../../../../../core/services/reniec.service';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ConsultaDniComponent],
  templateUrl: './crear-usuario.component.html',
})
export class CrearUsuarioComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private rolService = inject(RolService);
  private router = inject(Router);

  roles = signal<Rol[]>([]);
  loading = signal(false);
  alert = signal<{ type: 'success' | 'error'; msg: string } | null>(null);

  form: UsuarioCrearCompleto = {
    usuario: '',
    claveAcceso: '',
    rolId: 0,
    estado: 1,
    persona: {
      dni: '',
      nombre: '',
      apellidos: '',
      fechaNacimiento: '',
      genero: 'Masculino',
      telefono: '',
      nacionalidad: 'Peruana',
      correo: '',
      estado: 1,
    },
  };

  ngOnInit(): void {
    this.rolService.listar().subscribe({
      next: (roles) => {
        const activos = roles.filter((r) => r.estado === 1);
        this.roles.set(activos);
        if (activos.length) this.form.rolId = activos[0].id;
      },
    });
  }

  onDatosReniec(datos: DatosPersonaReniec) {
    this.form.persona = {
      ...this.form.persona,
      dni: datos.dni,
      nombre: datos.nombre,
      apellidos: datos.apellidos,
    };
    this.alert.set({ type: 'success', msg: 'Datos cargados desde RENIEC.' });
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.form.usuario || !this.form.claveAcceso || !this.form.rolId || !this.form.persona.dni) {
      this.alert.set({ type: 'error', msg: 'Complete los campos obligatorios.' });
      return;
    }
    this.loading.set(true);
    this.usuarioService.crearCompleto(this.form).subscribe({
      next: () => {
        this.alert.set({ type: 'success', msg: 'Usuario creado correctamente en la base de datos.' });
        setTimeout(() => this.router.navigate(['/dashboard/usuarios']), 1500);
      },
      error: () => this.alert.set({ type: 'error', msg: 'No se pudo crear el usuario. Verifique DNI y nombre de usuario únicos.' }),
      complete: () => this.loading.set(false),
    });
  }
}
