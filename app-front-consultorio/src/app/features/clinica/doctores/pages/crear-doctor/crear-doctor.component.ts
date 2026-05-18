import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FormData {
  nombre: string;
  apellido: string;
  cmp: string;
  especialidad: string;
  telefono: string;
  email: string;
  turno: string;
  diasAtencion: string[];
  consultorio: string;
  observaciones: string;
  estado: string;
}

@Component({
  selector: 'app-crear-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-doctor.component.html',
})
export class CrearDoctorComponent {
  form = signal<FormData>({
    nombre: '',
    apellido: '',
    cmp: '',
    especialidad: '',
    telefono: '',
    email: '',
    turno: '',
    diasAtencion: [],
    consultorio: '',
    observaciones: '',
    estado: 'activo',
  });

  loading = signal<boolean>(false);
  alert = signal<{ type: 'success' | 'error' | 'warning' | 'info'; msg: string } | null>(null);

  especialidades = [
    'Cardiología',
    'Dermatología',
    'Endocrinología',
    'Gastroenterología',
    'Ginecología',
    'Medicina General',
    'Neurología',
    'Oftalmología',
    'Pediatría',
    'Psiquiatría',
    'Traumatología',
    'Urología',
  ];

  dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  nombreCompleto = computed(() => {
    const f = this.form();
    return f.nombre || f.apellido ? `${f.nombre} ${f.apellido}`.trim() : '---';
  });

  inputCls =
    'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all';
  selectCls = `${this.inputCls} appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:1em_1em]`;

  showAlert(type: 'success' | 'error' | 'warning' | 'info', msg: string) {
    this.alert.set({ type, msg });
    if (type === 'success' || type === 'info') {
      setTimeout(() => this.alert.set(null), 5000);
    }
  }

  updateField(key: keyof FormData, value: any) {
    this.form.update((f) => ({ ...f, [key]: value }));
  }

  toggleDia(dia: string) {
    this.form.update((f) => {
      const dias = f.diasAtencion.includes(dia)
        ? f.diasAtencion.filter((d) => d !== dia)
        : [...f.diasAtencion, dia];
      return { ...f, diasAtencion: dias };
    });
  }

  handleConsultarCMP() {
    const cmpActual = this.form().cmp;
    if (!cmpActual) {
      this.showAlert('warning', 'Ingrese un número de CMP para consultar.');
      return;
    }
    this.loading.set(true);
    setTimeout(() => {
      this.form.update((prev) => ({
        ...prev,
        nombre: 'RICARDO MARIO',
        apellido: 'PALMA SORIANO',
        especialidad: 'Medicina General',
      }));
      this.showAlert('success', 'Médico encontrado y validado.');
      this.loading.set(false);
    }, 1000);
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    this.showAlert('success', 'Doctor registrado correctamente en el sistema.');
    this.form.set({
      nombre: '',
      apellido: '',
      cmp: '',
      especialidad: '',
      telefono: '',
      email: '',
      turno: '',
      diasAtencion: [],
      consultorio: '',
      observaciones: '',
      estado: 'activo',
    });
  }

  limpiarFormulario() {
    this.form.set({
      nombre: '',
      apellido: '',
      cmp: '',
      especialidad: '',
      telefono: '',
      email: '',
      turno: '',
      diasAtencion: [],
      consultorio: '',
      observaciones: '',
      estado: 'activo',
    });
    this.showAlert('info', 'Formulario restablecido.');
  }
}
