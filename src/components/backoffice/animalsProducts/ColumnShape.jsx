import i18n from 'i18next';

const columnShape = [
  {
    minWidth: 150,
    Header: () => i18n.t("Product"),
    accessor: "Product.name"
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Animal"),
    accessor: "Animal.identifier",
  },
  {
    Header: () => i18n.t("Quantity"),
    accessor: "quantity"
  },
  {
    Header: () => i18n.t("Quantity Available"),
    accessor: "quantityAvailable"
  },
];

export default columnShape;