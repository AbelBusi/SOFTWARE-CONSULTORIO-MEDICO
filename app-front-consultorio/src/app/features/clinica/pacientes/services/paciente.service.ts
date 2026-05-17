import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { PacienteInterface } from '../interface/paciente.interface';
import { MensajeResponse } from '../models/paciente.model';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private readonly baseUrl = `${environment.apiUrl}/pacientes`;

  constructor(private readonly http: HttpClient) {}

  listarPacientes(estado?: string): Observable<PacienteInterface[]> {
    let params = new HttpParams();
    if (estado) {
      params = params.set('estado', estado);
    }

    return this.http
      .get<MensajeResponse>(this.baseUrl, { params })
      .pipe(map((response) => response.object || []));
  }
}
