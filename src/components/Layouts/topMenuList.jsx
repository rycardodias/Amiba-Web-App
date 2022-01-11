import Icons from "icons/sidebar";

const index = [
  {
    title: "Backoffice",
    Icon: Icons.DataTableIcon,
    children: [{
      subTitle: "Organizations",
      path: "/backoffice/organizations",
      subCategories: [
        { name: "Organizations", path: "/backoffice/organizations" },
      ]
    },
    {
      subTitle: "Explorations",
      path: "/backoffice/explorations",
      subCategories: [
        { name: "Explorations", path: "/backoffice/explorations" },
        { name: "Certifications", path: "/backoffice/explorations/certifications" },
      ]
    },
    {
      subTitle: "Users",
      path: "/backoffice/users",
      subCategories: [
        { name: "Users", path: "/backoffice/users" },
      ]
    },

    {
      subTitle: "Restaurants",
      path: "/backoffice/restaurants",
      subCategories: [
        { name: "Restaurants", path: "/backoffice/restaurants" },
        { name: "Menus", path: "/backoffice/restaurants/menus" },
      ]
    },
    {
      subTitle: "Animals",
      path: "/backoffice/animals",
      subCategories: [
        { name: "Animals", path: "/backoffice/animals" },
        { name: "Animal/Product", path: "/backoffice/animals/animalProducts" },
      ]
    },
    {
      subTitle: "Eggs Batches",
      path: "/backoffice/eggsBatches",
      subCategories: [
        { name: "Eggs Batches", path: "/backoffice/eggsBatches" },
        { name: "Eggs Batch/Product", path: "/backoffice/eggsBatches/EggsBatchesProducts" },
        { name: "Eggs Batch Lines", path: "/backoffice/eggsBatches/EggsBatchesLines" },
      ]
    },

    {
      subTitle: "Orders",
      path: "/backoffice/orders",
      subCategories: [
        { name: "Orders", path: "/backoffice/orders" },
        { name: "Order Lines", path: "/backoffice/orderLines" },
        { name: "Order History", path: "/backoffice/orderHistory" },
      ]
    },

    {
      subTitle: "Products",
      path: "/backoffice/products",
      subCategories: [
        { name: "Products", path: "/backoffice/products" },
      ]
    },
    ]
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