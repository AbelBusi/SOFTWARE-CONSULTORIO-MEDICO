import { Injectable, inject } from '@angular/core';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
=======
import { HttpClient, HttpParams } from '@angular/common/http';
>>>>>>> 7103b47 (avance frontend implementacion recepcionista y roles)
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { MensajeResponse } from '../../../../shared/models/mensaje-response.model';
<<<<<<< HEAD
import { NombreRecepcionistaDTO } from '../interface/recepcionista.interface';
=======
import {
  RecepcionistaCrearDTO,
  RecepcionistaLeer,
  RecepcionistaActualizarDTO,
} from '../models/recepcionista.model';
>>>>>>> 7103b47 (avance frontend implementacion recepcionista y roles)

@Injectable({ providedIn: 'root' })
export class RecepcionistaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/recepcionistas`;

<<<<<<< HEAD
  resumen(): Observable<NombreRecepcionistaDTO[]> {
    return this.http
      .get<MensajeResponse<NombreRecepcionistaDTO[]>>(`${this.baseUrl}/resumen`)
      .pipe(map((r) => r.object ?? []));
  }
=======
  listar(estado?: 'ACTIVO' | 'INACTIVO'): Observable<RecepcionistaLeer[]> {
    let params = new HttpParams();
    if (estado) params = params.set('estado', estado);
    return this.http
      .get<MensajeResponse<RecepcionistaLeer[]>>(this.baseUrl, { params })
      .pipe(map((r) => r.object ?? []));
  }

  obtenerPorId(id: number): Observable<RecepcionistaLeer> {
    return this.http
      .get<MensajeResponse<RecepcionistaLeer>>(`${this.baseUrl}/${id}`)
      .pipe(map((r) => r.object));
  }

  crear(dto: RecepcionistaCrearDTO): Observable<unknown> {
    return this.http
      .post<MensajeResponse>(this.baseUrl, dto)
      .pipe(map((r) => r.object));
  }

  actualizar(id: number, dto: RecepcionistaActualizarDTO): Observable<unknown> {
    return this.http
      .put<MensajeResponse>(`${this.baseUrl}/${id}`, dto)
      .pipe(map((r) => r.object));
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
>>>>>>> 7103b47 (avance frontend implementacion recepcionista y roles)
}
