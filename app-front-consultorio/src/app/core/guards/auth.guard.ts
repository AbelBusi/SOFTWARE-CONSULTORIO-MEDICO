import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.getAccessToken()) {
    router.navigate(['/login']);
    return false;
  }

  const requiredPermission = route.data['permisoRequerido'];

  if (!requiredPermission) {
    return true;
  }

  const userAuthorities = authService.getAuthorities();

  if (userAuthorities.includes(requiredPermission)) {
    return true;
  }

  router.navigate(['/dashboard/inicio']);
  return false;
};
