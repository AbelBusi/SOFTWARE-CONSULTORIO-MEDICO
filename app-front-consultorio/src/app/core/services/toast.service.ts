import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastConfig {
  mensaje: string;
  tipo: ToastType;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toast = signal<ToastConfig | null>(null);

  show(mensaje: string, tipo: ToastType = 'info', duration: number = 4000): void {
    this.toast.set({ mensaje, tipo });
    setTimeout(() => this.toast.set(null), duration);
  }

  success(mensaje: string): void {
    this.show(mensaje, 'success');
  }
  error(mensaje: string): void {
    this.show(mensaje, 'error');
  }
  info(mensaje: string): void {
    this.show(mensaje, 'info');
  }
  warning(mensaje: string): void {
    this.show(mensaje, 'warning');
  }
}
