import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  onLogin = output<void>();

  // Inyectamos el Router de Angular usando la sintaxis moderna de inject()
  private router = inject(Router);

  showPass = signal<boolean>(false);
  usuario = signal<string>('');
  claveAcceso = signal<string>('');
  cargando = signal<boolean>(false);
  error = signal<string | null>(null);
  serverError = signal<string | null>(null);

  stats = signal([
    { label: 'Pacientes', value: '1,240' },
    { label: 'Doctores', value: '38' },
    { label: 'Citas hoy', value: '94' },
  ]);

  toggleShowPass(): void {
    this.showPass.update((value) => !value);
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (!this.usuario() || !this.claveAcceso()) {
      this.error.set('Por favor, ingresa tus credenciales.');
      return;
    }

    this.cargando.set(true);
    this.error.set(null);
    this.serverError.set(null);

    console.log('Datos listos para enviar a Java:', {
      usuario: this.usuario(),
      claveAcceso: this.claveAcceso(),
    });

    setTimeout(() => {
      this.cargando.set(false);

      this.onLogin.emit();

      this.router.navigate(['/dashboard']);
    }, 1200);
  }

  closeServerError(): void {
    this.serverError.set(null);
  }
}
