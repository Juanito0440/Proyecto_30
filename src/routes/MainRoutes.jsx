import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import RouteController from './RouteController';

const Home = Loadable(lazy(() => import('../views/Home')));
const Login = Loadable(lazy(() => import('views/Login')));
const Projects = Loadable(lazy(() => import('views/projects')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const MainP = Loadable(lazy(() => import('layout/MainLayout')));
const Users = Loadable(lazy(() => import('../views/admin/UserManagement')));
const Dashboard = Loadable(lazy(() => import ('../views/dashboard/Default/index')));

// const MainRoutes = {
//   path: '/',
//   children: [
//     {
//       path: '/',
//       element: <Login />
//     },
//     {
//       path: '/login',
//       element: <Login />
//     },
//      {
//       path: '/juan',
//       element: <Dashboard />
//     },
//     // {
//     //   path: '/app',
//     //   element: (
//     //     <RouteController>
//     //       <Home />
//     //     </RouteController>
//     //   )
//     // },
//     // {
//     //   path: '/projects',
//     //   element: <Projects />
//     // },
//     {
//       path: '/sample-page',
//       element: <SamplePage />
//     },
//     {
//       path: '/Main',
//       element: <MainP />
//     }
//   ]
//

// const MainRoutes = {
//   path: '/',
//   element: <MainP />, // Aquí usas el layout principal
//   children: [
//     {
//       path: '/dashboard/default',
//       element: <Dashboard />
//     },
//     {
//       path: '/usuarios',
//       element: <Users/>
      
//     },
    
//     {
//       path: '/projectList',
//       element: <Projects />
//     },
//     {
//       path: '/sample-page',
//       element: <SamplePage />
//     },
//     {
//       path: '/usuarios',
//       element: <Users />
//     }
//   ]
// };

const MainRoutes = {
  path: '/',
  element: (
    <RouteController>
      <MainP />
    </RouteController>
  ),
  children: [
    {
      path: 'dashboard/default',
      element: (
        <RouteController>
          <MainP />
        </RouteController>
      )
    },
    
    {
      path: '/usuarios',
      element: (
        <RouteController >
          <Users />
        </RouteController>
      )
    },
    {
      path: 'projectList',
      element: (
        <RouteController>
          <Projects />
        </RouteController>
      )
    },
    {
      path: 'sample-page',
      element: (
        <RouteController>
          <SamplePage />
        </RouteController>
      )
    }
  ]
};


export default MainRoutes;
