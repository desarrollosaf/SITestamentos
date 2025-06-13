import { Routes } from "@angular/router";

export default [
    {
        path: '',
        loadComponent: () => import('./solicitudes.component').then(c => c.SolicitudesComponent)
    },
    {
        path: 'show/:id',
        loadComponent: () => import('./detalle-solicitud/detalle-solicitud.component').then(c => c.DetalleSolicitudComponent)
    }
] as Routes;