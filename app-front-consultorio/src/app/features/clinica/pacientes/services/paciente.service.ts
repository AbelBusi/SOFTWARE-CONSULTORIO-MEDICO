import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeResponse, Paciente } from '../interface/paciente.interface';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private http = inject(HttpClient);

  listarPacientesActivos(): Observable<MensajeResponse<Paciente[]>> {
    const params = new HttpParams().set('estado', 'ACTIVO');
    return this.http.get<MensajeResponse<Paciente[]>>('/pacientes', { params });
  }
}
