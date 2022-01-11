
import i18n from 'i18next';

const columnShape = [
  {
    minWidth: 150,
    Header: () => i18n.t("Order"),
    accessor: "OrderId",
  },
  {
    minWidth: 150,
    Header: () => i18n.t("State"),
    accessor: "state",
  },
];

export default columnShape;