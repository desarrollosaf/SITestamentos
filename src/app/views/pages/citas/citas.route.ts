

import { Routes } from "@angular/router";

export default [
    { path: '', redirectTo: 'citas', pathMatch: 'full' },
    {
        path: '',
        loadComponent: () => import('./citas.component').then(c => c.CitasComponent) 
    },
    {
        path: 'detalle-citas',
        loadComponent: () => import('./detalle-citas/detalle-citas.component').then(c => c.DetalleCitasComponent),
    }
] as Routes;