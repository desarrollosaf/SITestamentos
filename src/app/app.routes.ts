import { Routes } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/pages/home/home.component').then(c => c.HomeComponent) 
  },
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
      },
      {
        path: 'reportes',
        loadComponent: () => import('./views/pages/reportes/reportes.component').then(c => c.ReportesComponent)
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
    canActivate: [authGuard],
    loadComponent: () => import('./views/pages/registro/registro.component').then(c => c.RegistroComponent)
  },
  { path: '**', redirectTo: 'error/404', pathMatch: 'full' }
];
