import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

import {
  EspecialidadCrearDTO,
  MensajeResponse,
  MensajeResponseSingle,
  EspecialidadActualizar,
  MensajeResponseResumen,
} from '../interface/especialidad.interface';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadService {
  private readonly baseUrl = `${environment.apiUrl}/especialidades`;

  constructor(private readonly http: HttpClient) {}

  listarActivos(): Observable<MensajeResponse> {
    const params = new HttpParams().set('estado', 'activo');
    return this.http.get<MensajeResponse>(this.baseUrl, { params });
  }

  crear(especialidad: EspecialidadCrearDTO): Observable<MensajeResponseSingle> {
    return this.http.post<MensajeResponseSingle>(this.baseUrl, especialidad);
  }

  actualizar(id: number, dto: EspecialidadActualizar): Observable<MensajeResponseSingle> {
    return this.http.put<MensajeResponseSingle>(`${this.baseUrl}/${id}`, dto);
  }

  eliminarPorId(id: number): Observable<MensajeResponse> {
    return this.http.delete<MensajeResponse>(`${this.baseUrl}/${id}`);
  }

  listarResumen(): Observable<MensajeResponseResumen> {
    return this.http.get<MensajeResponseResumen>(`${this.baseUrl}/resumen`);
  }

}
