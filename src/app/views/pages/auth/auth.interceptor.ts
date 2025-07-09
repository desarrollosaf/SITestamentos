import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('myToken');
  const router = inject(Router);

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError(err => {
      if (err.status === 401) {
        // Token inválido o expirado

        // Limpia el token
        localStorage.removeItem('myToken');

        // Redirige al login
        router.navigate(['/auth/login']);

        // Opcional: muestra mensaje, o puedes usar un servicio de notificaciones

        // También puedes devolver un error vacío o un throwError para parar la cadena
      }

      return throwError(() => err);
    })
  );
};