import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { Navigate } from 'react-router';

// maintenance routing
const LoginPage = Loadable(lazy(() => import('../views/Login/Login')));
const RegisterPage = Loadable(lazy(() => import('views/pages/authentication/Register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

// const AuthenticationRoutes = {
//   path: '/',
//   children: [
//     {
//       path: '/',
//       element: <Navigate to="/login" />
//     },
//     {
//       path: '/login',
//       element: <LoginPage />
//     }
//   ]
// };

const AuthenticationRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <Navigate to="/login" />
    },
    {
      path: 'login',
      element: <LoginPage />
    },
    {
      path: 'register',
      element: <RegisterPage />
    }
  ]
};




export default AuthenticationRoutes;
