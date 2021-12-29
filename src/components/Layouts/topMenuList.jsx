import Icons from "icons/sidebar";
const index = [
  {
    title: "Backoffice",
    Icon: Icons.DataTableIcon,
    children: [{
      subTitle: "Organizations",
      path: "/dashboard/organizations"
    }, {
      subTitle: "Explorations",
      path: "/dashboard/explorations"
    }]
  },

  {
    title: "Dashboard",
    Icon: Icons.DashboardIcon,
    children: [{
      subTitle: "Dashboards",
      subCategories: [{
        name: "Saas",
        path: "/dashboard/"
      }, {
        name: "Sales",
        path: "/dashboard/sales"
      }, {
        name: "Project Management",
        path: "/dashboard/project-management"
      }, {
        name: "Project Management V2",
        path: "/dashboard/project-management-v2"
      }],
      path: ""
    }]
  }, {
    title: "Admin Ecommerce",
    Icon: Icons.AdminEcommerceIcon,
    children: [{
      subTitle: "Product management",
      path: "/dashboard/product-list"
    }, {
      subTitle: "Order management",
      path: "/dashboard/order-list"
    }, {
      subTitle: "Customer management",
      path: "/dashboard/customer-list"
    }]
  }, {
    title: "Ecommerce",
    Icon: Icons.EcommerceIcon,
    children: [{
      subTitle: "Shop",
      path: "/dashboard/shop"
    }, {
      subTitle: "Cart",
      path: "/dashboard/cart"
    }, {
      subTitle: "Checkout",
      path: "/dashboard/payment"
    }, {
      subTitle: "Purchase Confirmation",
      path: "/dashboard/payment-success"
    }]
  }, {
    title: "Invoice",
    Icon: Icons.InvoiceIcon,
    children: [{
      subTitle: "Invoice List",
      path: "/dashboard/invoice-list"
    }, {
      subTitle: "Add Invoice",
      path: "/dashboard/add-invoice"
    }, {
      subTitle: "Invoice Details",
      path: "/dashboard/invoice-details"
    }]
  }, {
    title: "User Management",
    Icon: Icons.UserManagementIcon,
    children: [{
      subTitle: "User Grid",
      path: "/dashboard/user-grid"
    }, {
      subTitle: "User List",
      path: "/dashboard/user-list"
    }, {
      subTitle: "Add User",
      path: "/dashboard/add-user"
    }]
  }, {
    title: "Sessions",
    Icon: Icons.SessionsIcon,
    children: [{
      subTitle: "Sign In",
      path: "/login"
    }, {
      subTitle: "Sign Up",
      path: "/register"
    }, {
      subTitle: "Forgot Password",
      path: "/forget-password"
    }, {
      subTitle: "Error 404",
      path: "*"
    }]
  }, {
    title: "Pages",
    Icon: Icons.PagesIcon,
    children: [{
      subTitle: "About",
      path: "/dashboard/about"
    }, {
      subTitle: "Contact",
      path: "/dashboard/contact"
    }, {
      subTitle: "Privacy",
      path: "/dashboard/privacy"
    }]
  }];
export default index;