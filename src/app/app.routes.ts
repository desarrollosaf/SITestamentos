import { Routes } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./views/pages/auth/auth.routes')},
  {
    path: '',
    component: BaseComponent,
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'solicitudes', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.routes')
      },
      {
        path: 'solicitudes',
        loadChildren: () => import('./views/pages/solicitudes/solicitudes.route')
      }
    ]
  },
  {
    path: 'error',
    loadComponent: () => import('./views/pages/error/error.component').then(c => c.ErrorComponent),
  },
  {
    path: 'error/:type',
    loadComponent: () => import('./views/pages/error/error.component').then(c => c.ErrorComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./views/pages/registro/registro.component').then(c => c.RegistroComponent)
  },
  {
    path: 'citas',
    loadComponent: () => import('./views/pages/citas/citas.component').then(c => c.CitasComponent)
  },
  { path: '**', redirectTo: 'error/404', pathMatch: 'full' }
];
