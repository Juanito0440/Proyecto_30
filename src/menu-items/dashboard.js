// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Funciones',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Proyectos',
      type: 'item',
      url: '/projectList',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'default',
      title: 'Usuarios',
      type: 'item',
      url: '/usuarios',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'Projects',
      title: 'Proyectos',
      type: 'item',
      url: '/Projects',
      icon: null,
      breadcrumbs: false,
      listStyle: 'none'
    }
  ]
};

export default dashboard;
