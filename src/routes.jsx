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

const DashboardSaaS = Loadable(lazy(() => import('./pages/dashboards/SaaS')));
const DashboardSales = Loadable(lazy(() => import('./pages/dashboards/Sales')));
const DashboardProjectManagement = Loadable(lazy(() => import('./pages/dashboards/ProjectManagement')));
const DashboardProjectManagementV2 = Loadable(lazy(() => import('./pages/dashboards/ProjectManagementV2'))); // data tables

const DataTableV1 = Loadable(lazy(() => import('./pages/dataTable/DataTableV1')));
const DataTableV2 = Loadable(lazy(() => import('./pages/dataTable/DataTableV2'))); // account settings

const AccountSettings = Loadable(lazy(() => import('./pages/AccountSettings'))); // projects

const TeamMember = Loadable(lazy(() => import('./pages/TeamMember')));
const UkoProjectV1 = Loadable(lazy(() => import('./pages/ukoProjects/UkoProjectV1')));
const UkoProjectV2 = Loadable(lazy(() => import('./pages/ukoProjects/UkoProjectV2')));
const UkoProjectV3 = Loadable(lazy(() => import('./pages/ukoProjects/UkoProjectV3')));
const ProjectDetails = Loadable(lazy(() => import('./pages/ukoProjects/ProjectDetails'))); // user profile

const UserProfile = Loadable(lazy(() => import('./pages/UserProfile'))); // admin eCommerce

const OrderList = Loadable(lazy(() => import('./pages/adminEcommerce/OrderList')));
const ProductList = Loadable(lazy(() => import('./pages/adminEcommerce/ProductList')));
const CustomerList = Loadable(lazy(() => import('./pages/adminEcommerce/CustomerList'))); // shop

const Shop = Loadable(lazy(() => import('./pages/shop')));
const Cart = Loadable(lazy(() => import('./pages/shop/Cart')));
const Payment = Loadable(lazy(() => import('./pages/shop/Payment')));
const PaymentSuccess = Loadable(lazy(() => import('./pages/shop/PaymentSuccess'))); // invoice

const InvoiceList = Loadable(lazy(() => import('./pages/invoice/InvoiceList')));
const AddInvoice = Loadable(lazy(() => import('./pages/invoice/AddInvoice')));
const InvoiceDetails = Loadable(lazy(() => import('./pages/invoice/InvoiceDetails'))); // user management

const UserList = Loadable(lazy(() => import('./pages/userManagement/UserList')));
const UserGrid = Loadable(lazy(() => import('./pages/userManagement/UserGrid')));
const AddNewUser = Loadable(lazy(() => import('./pages/userManagement/AddNewUser'))); // chat


const Error = Loadable(lazy(() => import('./pages/404'))); // routes

const routes = [{
  path: '/',
  element: <Navigate to="dashboard" />
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
}, {
  path: 'dashboard',
  element: <AuthGuard>
        <DashboardLayout />
      </AuthGuard>,
  children: [{
    path: '',
    element: <DashboardSaaS />
  }, {
    path: 'sales',
    element: <DashboardSales />
  }, {
    path: 'project-management',
    element: <DashboardProjectManagement />
  }, {
    path: 'project-management-v2',
    element: <DashboardProjectManagementV2 />
  }, {
    path: 'data-table-v1',
    element: <DataTableV1 />
  }, {
    path: 'data-table-v2',
    element: <DataTableV2 />
  }, {
    path: 'account-settings',
    element: <AccountSettings />
  },  {
    path: 'uko-project-v1',
    element: <UkoProjectV1 />
  }, {
    path: 'uko-project-v2',
    element: <UkoProjectV2 />
  }, {
    path: 'uko-project-v3',
    element: <UkoProjectV3 />
  }, {
    path: 'project-details',
    element: <ProjectDetails />
  }, {
    path: 'team-member',
    element: <TeamMember />
  }, {
    path: 'user-profile',
    element: <UserProfile />
  }, {
    path: 'product-list',
    element: <ProductList />
  }, {
    path: 'order-list',
    element: <OrderList />
  }, {
    path: 'customer-list',
    element: <CustomerList />
  }, {
    path: 'shop',
    element: <Shop />
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
    path: 'invoice-list',
    element: <InvoiceList />
  }, {
    path: 'add-invoice',
    element: <AddInvoice />
  }, {
    path: 'invoice-details',
    element: <InvoiceDetails />
  }, {
    path: 'user-list',
    element: <UserList />
  }, {
    path: 'user-grid',
    element: <UserGrid />
  }, {
    path: 'add-user',
    element: <AddNewUser />
  },  {
    path: 'about',
    element: <AboutPage />
  }, {
    path: 'contact',
    element: <ContactPage />
  }, {
    path: 'privacy',
    element: <PrivacyPage />
  }]
}, {
  path: '*',
  element: <Error />
}];
export default routes;