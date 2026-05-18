import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

import {
  EspecialidadCrearDTO,
  MensajeResponse,
  MensajeResponseSingle,
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

}
