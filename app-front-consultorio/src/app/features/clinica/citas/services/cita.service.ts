import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { MensajeResponse } from '../../../../shared/models/mensaje-response.model';
import { CitaMedica } from '../models/cita.model';

export interface CitaMedicaCrearDTO {
  recepcionista: { id: number };
  paciente: { id: number };
  doctor: { id: number };
  especialidad: { id: number };
  motivo: string;
  fecha: string;
  horaInicio: string;
  horaSalida: string;
  costo: number;
  estado?: number;
}

@Injectable({ providedIn: 'root' })
export class CitaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/citas-medicas`;

  listar(): Observable<CitaMedica[]> {
    return this.http
      .get<MensajeResponse<CitaMedica[]>>(this.baseUrl)
      .pipe(map((r) => r.object ?? []));
  }

  crear(dto: CitaMedicaCrearDTO): Observable<unknown> {
    return this.http
      .post<MensajeResponse>(this.baseUrl, dto)
      .pipe(map((r) => r.object));
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
