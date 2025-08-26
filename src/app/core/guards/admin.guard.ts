import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../../app/core/services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const _userService = inject(UserService) ;
  const userRole = ['Administrador', 'Validador']
  const rfc = _userService.currentUserValue?.rfc ?? '';
  const role = rfc.startsWith('NOT25') ? 'NOT25' : 'usuario';
  if (role == 'NOT25') {
    return true;
  }

  router.navigate(['/error/404']);
  return false;

};
