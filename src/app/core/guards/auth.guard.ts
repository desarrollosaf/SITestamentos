// import { inject } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
// import { jwtDecode } from 'jwt-decode';

// export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
// const router = inject(Router);

//   const token = localStorage.getItem('myToken');

//   if (token) {
//     try {
//       const decoded: any = jwtDecode(token);
//       const now = Math.floor(Date.now() / 1000);

//       if (decoded.exp && decoded.exp > now) {
//         return true;

//       } else {
//         localStorage.removeItem('myToken');

//       }

//     } catch (error) {
//       localStorage.removeItem('myToken');
//     }
//   }

//   router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url.split('?')[0] } });
//   return false;
// };
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  return userService.getCurrentUser().pipe(
    map(user => {
      userService.setCurrentUser(user); // opcional
      return true;
    }),
    catchError(() => {
      router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return of(false);
    })
  );
};