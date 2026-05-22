import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { MensajeResponse } from '../../../../shared/models/mensaje-response.model';
import { NombreRecepcionistaDTO } from '../interface/recepcionista.interface';

@Injectable({ providedIn: 'root' })
export class RecepcionistaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/recepcionistas`;

  resumen(): Observable<NombreRecepcionistaDTO[]> {
    return this.http
      .get<MensajeResponse<NombreRecepcionistaDTO[]>>(`${this.baseUrl}/resumen`)
      .pipe(map((r) => r.object ?? []));
  }
}
