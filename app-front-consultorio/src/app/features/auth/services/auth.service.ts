import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { InicioSolicitud, TokenResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(credenciales: InicioSolicitud): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>('/auth/login', credenciales)
      .pipe(tap((tokens) => this.guardarTokens(tokens)));
  }

  refrescarToken(): Observable<TokenResponse> {
    const refreshToken = this.getRefreshToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${refreshToken}`);

    return this.http
      .post<TokenResponse>('/auth/refresh', {}, { headers })
      .pipe(tap((tokens) => this.guardarTokens(tokens)));
  }

  private guardarTokens(tokens: TokenResponse): void {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
