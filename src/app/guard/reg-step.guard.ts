import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const regStepGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const step = authService.getStep();

  if (step !== route.url[0]?.path) {
    router.navigate(['/auth/register', step]);
    return false;
  }

  return true;
};
