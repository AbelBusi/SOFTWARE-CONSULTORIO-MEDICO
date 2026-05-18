import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { MensajeResponse } from '../../../../shared/models/mensaje-response.model';
import { DoctorLeer, DoctorCrearDTO, NombreDoctorResumen } from '../models/doctor.model';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/doctores`;

  listar(estado?: 'activo' | 'inactivo'): Observable<DoctorLeer[]> {
    let params = new HttpParams();
    if (estado) params = params.set('estado', estado);
    return this.http
      .get<MensajeResponse<DoctorLeer[]>>(this.baseUrl, { params })
      .pipe(map((r) => r.object ?? []));
  }

  resumen(): Observable<NombreDoctorResumen[]> {
    return this.http
      .get<MensajeResponse<NombreDoctorResumen[]>>(`${this.baseUrl}/resumen`)
      .pipe(map((r) => r.object ?? []));
  }

  crear(dto: DoctorCrearDTO): Observable<unknown> {
    return this.http
      .post<MensajeResponse>(this.baseUrl, dto)
      .pipe(map((r) => r.object));
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
