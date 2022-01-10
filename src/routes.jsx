import AuthGuard from 'components/authentication/AuthGuard';
import GuestGuard from 'components/authentication/GuestGuard';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import LoadingScreen from 'components/LoadingScreen';
import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

const Loadable = Component => props => <Suspense fallback={<LoadingScreen />}>
  <Component {...props} />
</Suspense>; // Landing page


// const LandingPage = Loadable(lazy(() => import('./pages/LandingPage')));
const ComponentsPage = Loadable(lazy(() => import('./pages/ComponentsPage')));
const AboutPage = Loadable(lazy(() => import('./pages/About')));
const PrivacyPage = Loadable(lazy(() => import('./pages/Privacy')));
const ContactPage = Loadable(lazy(() => import('./pages/Contact'))); // authentication pages

const Login = Loadable(lazy(() => import('./pages/authentication/Login')));
const Register = Loadable(lazy(() => import('./pages/authentication/Register')));
const ForgetPassword = Loadable(lazy(() => import('./pages/authentication/ForgetPassword'))); // Dashboard pages

const AccountSettings = Loadable(lazy(() => import('./pages/AccountSettings'))); // projects


const Shop = Loadable(lazy(() => import('./pages/shop')));
const Cart = Loadable(lazy(() => import('./pages/shop/Cart')));
const Payment = Loadable(lazy(() => import('./pages/shop/Payment')));
const PaymentSuccess = Loadable(lazy(() => import('./pages/shop/PaymentSuccess'))); // invoice

const OrganizationsList = Loadable(lazy(() => import('pages/backoffice/OrganizationsList')));
const ExplorationsList = Loadable(lazy(() => import('pages/backoffice/ExplorationsList')));
const UsersList = Loadable(lazy(() => import('pages/backoffice/UsersList')));



const Error = Loadable(lazy(() => import('./pages/404'))); // routes

const routes = [{
  path: '/',
  element: <Navigate to="shop/list" /> //FIXME adicionar aqui um elemento novo
}, {
  path: 'components',
  element: <ComponentsPage />
}, {
  path: 'login',
  element: <GuestGuard>
    <Login />
  </GuestGuard>
}, {
  path: 'register',
  element: <GuestGuard>
    <Register />
  </GuestGuard>
}, {
  path: 'forget-password',
  element: <GuestGuard>
    <ForgetPassword />
  </GuestGuard>
},

// ###### BACKOFFICE #####
{
  path: 'backoffice',
  element: <AuthGuard>
    <DashboardLayout />
  </AuthGuard>,
  children: [
    { path: 'organizations', element: <OrganizationsList /> },
    { path: 'explorations', element: <ExplorationsList /> },
    { path: 'users', element: <UsersList /> },

    
    {
      path: 'account-settings',
      element: <AccountSettings />
    }, {
      path: 'cart',
      element: <Cart />
    }, {
      path: 'payment',
      element: <Payment />
    }, {
      path: 'payment-success',
      element: <PaymentSuccess />
    }, {
      path: 'about',
      element: <AboutPage />
    }, {
      path: 'contact',
      element: <ContactPage />
    }, {
      path: 'privacy',
      element: <PrivacyPage />
    }]
},
{
  path: 'shop',
  element: <AuthGuard>
    <DashboardLayout />
  </AuthGuard>,
  children: [
    { path: 'list', element: <Shop /> },
    { path: 'cart', element: <Cart /> }
  ]
}, {
  path: 'account',
  element: <AuthGuard>
    <DashboardLayout />
  </AuthGuard>,
  children: [
    { path: 'account-settings', element: <AccountSettings /> },
  ]
},
{
  path: '*',
  element: <Error />
}];
export default routes;