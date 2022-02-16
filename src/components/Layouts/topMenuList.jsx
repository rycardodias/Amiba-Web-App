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
        { name: "Eggs Batch/Product", path: "/backoffice/eggsBatches/eggsBatchesProducts" },
        { name: "Eggs Batches Lines", path: "/backoffice/eggsBatches/eggsBatchesLines" },
      ]
    },

    {
      subTitle: "Orders",
      path: "/backoffice/orders",
      subCategories: [
        { name: "Orders", path: "/backoffice/orders" },
        { name: "Order Lines", path: "/backoffice/orders/ordersLines" },
        { name: "Order History", path: "/backoffice/orders/ordersHistory" },
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
    },
      // {
      //   subTitle: "Checkout",
      //   path: "/shop/payment"
      // },
      //  {
      //   subTitle: "Purchase Confirmation",
      //   path: "/shop/payment-success"
      // }
    ]
  },
];
export default index;