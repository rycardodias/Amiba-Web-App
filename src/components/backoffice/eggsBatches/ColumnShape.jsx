import i18n from 'i18next';

const columnShape = [
  {
    minWidth: 150,
    Header: () => i18n.t("Exploration"),
    accessor: "Exploration.name",
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Name"),
    accessor: "name",
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Quantity"),
    accessor: "quantity",
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Quantity Available"),
    accessor: "quantityAvailable",
  },
];

export default columnShape;