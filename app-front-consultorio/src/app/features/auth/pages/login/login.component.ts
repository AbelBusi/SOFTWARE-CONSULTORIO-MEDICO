import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styles:[]
})
export class LoginComponent {
  onLogin = output<void>();

  // Manejo de estado con Angular Signals
  showPass = signal<boolean>(false);
  usuario = signal<string>('');
  claveAcceso = signal<string>('');
  cargando = signal<boolean>(false);
  error = signal<string | null>(null);
  serverError = signal<string | null>(null);

  // Tarjetas informativas de la sección lateral derecha
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
    if (!this.usuario() || !this.claveAcceso()) return;

    this.cargando.set(true);
    this.error.set(null);
    this.serverError.set(null);

    console.log('Datos listos para enviar a Java:', {
      usuario: this.usuario(),
      claveAcceso: this.claveAcceso(),
    });

  }

  closeServerError(): void {
    this.serverError.set(null);
  }
}
