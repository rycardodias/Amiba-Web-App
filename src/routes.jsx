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
const CertificationsList = Loadable(lazy(() => import('pages/backoffice/CertificationsList')));
const AnimalsList = Loadable(lazy(() => import('pages/backoffice/AnimalsList')));
const AnimalsProductsList = Loadable(lazy(() => import('pages/backoffice/AnimalsProductsList')));
const EggsBatchesList = Loadable(lazy(() => import('pages/backoffice/EggsBatchesList')));
const EggsBatchesProductsList = Loadable(lazy(() => import('pages/backoffice/EggsBatchesProductsList')));
const EggsBatchesLinesList = Loadable(lazy(() => import('pages/backoffice/EggsBatchesLinesList')));
const OrdersList = Loadable(lazy(() => import('pages/backoffice/OrdersList')));
const OrdersLinesList = Loadable(lazy(() => import('pages/backoffice/OrdersLinesList')));
const OrdersHistoryList = Loadable(lazy(() => import('pages/backoffice/OrdersHistoryList')));



const UsersList = Loadable(lazy(() => import('pages/backoffice/UsersList')));
const RestaurantsList = Loadable(lazy(() => import('pages/backoffice/RestaurantsList')));
const MenusList = Loadable(lazy(() => import('pages/backoffice/MenusList')));

const ProductsList = Loadable(lazy(() => import('pages/backoffice/ProductsList')));




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
    { path: 'explorations/certifications', element: <CertificationsList /> },
    { path: 'users', element: <UsersList /> },
    { path: 'restaurants', element: <RestaurantsList /> },
    { path: 'restaurants/menus', element: <MenusList /> },
    { path: 'animals', element: <AnimalsList /> },
    { path: 'animals/animalProducts', element: <AnimalsProductsList /> },
    { path: 'eggsBatches', element: <EggsBatchesList /> },
    { path: 'eggsBatches/EggsBatchesProducts', element: <EggsBatchesProductsList /> },
    { path: 'eggsBatches/EggsBatchesLines', element: <EggsBatchesLinesList /> },
    { path: 'orders', element: <OrdersList /> },
    { path: 'orders/ordersLines', element: <OrdersLinesList /> },
    { path: 'orders/ordersHistory', element: <OrdersHistoryList /> },

    { path: 'products', element: <ProductsList /> },


    // {
    //   path: 'account-settings',
    //   element: <AccountSettings />
    // }, {
    //   path: 'cart',
    //   element: <Cart />
    // }, {
    //   path: 'payment',
    //   element: <Payment />
    // }, {
    //   path: 'payment-success',
    //   element: <PaymentSuccess />
    // }, {
    //   path: 'about',
    //   element: <AboutPage />
    // }, {
    //   path: 'contact',
    //   element: <ContactPage />
    // }, {
    //   path: 'privacy',
    //   element: <PrivacyPage />
    // }
  ]
},
{
  path: 'shop',
  element: <AuthGuard>
    <DashboardLayout />
  </AuthGuard>,
  children: [
    { path: 'list', element: <Shop /> },
    { path: 'cart', element: <Cart /> },
    { path: 'payment', element: <Payment /> },
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