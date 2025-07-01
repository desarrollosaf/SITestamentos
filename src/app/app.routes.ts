import { Routes } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { authGuard } from './core/guards/auth.guard';
import { DetalleCitasComponent } from './views/pages/detalle-citas/detalle-citas.component';

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
      },
      {
        path: 'detalle-citas',
        component: DetalleCitasComponent
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
  {
    path: 'citas',
    canActivate: [authGuard],
    loadComponent: () => import('./views/pages/citas/citas.component').then(c => c.CitasComponent)
  },
  { path: '**', redirectTo: 'error/404', pathMatch: 'full' }
];
