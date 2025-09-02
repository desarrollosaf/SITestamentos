import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Solicitudes',
    icon: 'book',
    link: '/solicitudes',
    roles: ['Administrador', 'Validador'],
  },
  {
    label: 'Citas',
    icon: 'file-text',
    link: '/detalle-citas',
    roles: ['Administrador', 'Validador'],
  },
  {
    label: 'Reportes',
    icon: 'check-square',
    link: '/reportes',
    roles: ['Administrador', 'Validador'],
  },
  
  
];
