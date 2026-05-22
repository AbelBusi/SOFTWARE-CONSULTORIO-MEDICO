import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { MensajeResponse } from '../../../../shared/models/mensaje-response.model';
import { UsuarioLeer, UsuarioCrearCompleto } from '../models/usuario.model';
import { PersonaService } from '../../../../core/services/persona.service';
import { AuthService } from '../../../auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly http = inject(HttpClient);
  private readonly personaService = inject(PersonaService);
  private readonly authService = inject(AuthService);
  private readonly baseUrl = `${environment.apiUrl}/usuarios`;

  listar(): Observable<UsuarioLeer[]> {
    return this.http
      .get<MensajeResponse<UsuarioLeer[]>>(this.baseUrl)
      .pipe(map((r) => r.object ?? []));
  }

  crearCompleto(dto: UsuarioCrearCompleto): Observable<unknown> {
    return this.personaService.crear(dto.persona).pipe(
      switchMap((personaRef) =>
        this.authService.registrar({
          persona: { id: personaRef.id },
          rol: { id: dto.rolId },
          usuario: dto.usuario,
          claveAcceso: dto.claveAcceso,
          estado: dto.estado,
        }),
      ),
      map(() => true),
    );
  }
}
