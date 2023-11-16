import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticationGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (!!localStorage.getItem('token')) {
    return true;
  }

  return router.parseUrl('/login');
};
