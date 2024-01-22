import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const refreshToken = authService.getRefreshToken()

  if (checkToAuthPath(route)) {
    if (refreshToken) {
      router.navigate(['/'])
      return false
    }

    return true;
  }

  if (refreshToken) {
    return true
  }

  router.navigate(['/auth/login'])
  return false;
};

function checkToAuthPath(route: any) {
  return route.url[0]?.path ? true : false
}
