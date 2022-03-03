import i18n from 'i18next';
import { ordersHistoryTypes } from 'lib/values/types';

const columnShape = [
  {
    minWidth: 150,
    Header: () => i18n.t("User"),
    accessor: "User.name"
  },
  {
    minWidth: 150,
    Header: () => i18n.t("VAT Number"),
    accessor: "fiscalNumber"
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Total"),
    accessor: "total"
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Total VAT"),
    accessor: "totalVAT"
  },
  {
    Header: () => i18n.t("State"),
    accessor: "OrderHistories.state",
    Cell: ({ row }) => {
      const { state } = row.original.OrderHistories[0];
      return i18n.t(ordersHistoryTypes.find(item => item.id === state).name)
    }
  },
];


export default columnShape;