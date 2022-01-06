import i18next from "i18next";
import Icons from "icons/sidebar";

const translate = async (value) => {
  return i18next.t(value)
}

const index = [
  {
    title: "Backoffice",
    Icon: Icons.DataTableIcon,
    children: [{
      subTitle: translate("Organizations"),
      path: "/backoffice/organizations"
    }, {
      subTitle: "Explorations",
      path: "/backoffice/explorations"
    }]
  },
  // ### LOJA ###
  {
    title: "Ecommerce",
    Icon: Icons.EcommerceIcon,
    children: [{
      subTitle: "Shop",
      path: "/shop/list"
    }, {
      subTitle: "Cart",
      path: "/shop/cart"
    }]
  },
  // #########################
  {
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
  },
  {
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