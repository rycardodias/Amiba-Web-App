import i18n from 'i18next';
import { ordersHistoryTypes } from 'lib/values/types';

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
  {
    Header: () => i18n.t("State"),
    accessor: "OrderHistories.state",
    Cell: ({ row }) => {
      const { state } = row.original.OrderHistories;
      return i18n.t(ordersHistoryTypes.find(item => item.id === state).name)
    }
  },

];

export default columnShape;