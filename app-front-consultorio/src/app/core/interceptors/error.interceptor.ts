import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/auth/login')) {
        return authService.refrescarToken().pipe(
          switchMap((nuevosTokens) => {
            // Clonamos la petición original fallida pero con el nuevo token de acceso
            const nuevaReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${nuevosTokens.access_token}`,
              },
            });
            return next(nuevaReq);
          }),
          catchError((errRefresh) => {
            authService.logout();
            window.location.href = '/login';
            return throwError(() => errRefresh);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};
