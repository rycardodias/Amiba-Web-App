
import i18n from 'i18next';
import { ordersHistoryTypes } from 'lib/values/types';

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
    Cell: ({ row }) => {
      const { state } = row.original;
      return i18n.t(ordersHistoryTypes.find(item => item.id === state).name)
    }
  },
];

export default columnShape;