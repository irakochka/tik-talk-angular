import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@tt/data-access';

export const canActivateAuth = () => {
  const auth = inject(AuthService);
  return auth.isAuth ? true : inject(Router).createUrlTree(['/login']);
};

export const canActivateGuest = () => {
  const auth = inject(AuthService);
  return auth.isAuth ? inject(Router).createUrlTree(['/profile/me']) : true;
};
