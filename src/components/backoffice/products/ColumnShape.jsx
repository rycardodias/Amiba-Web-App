
import i18n from 'i18next';
import { CommonCell, SelectColumnFilter, DateColumnFilter } from 'components/backoffice/utils/columnFilters'


const columnShape = [
  {
    minWidth: 150,
    Header: () => i18n.t("Name"),
    accessor: "name",
  },
  {
    Header: () => i18n.t("Type"),
    accessor: "type",
    Filter: SelectColumnFilter

  },
  {
    Header: () => i18n.t("Tax"),
    accessor: "tax",
    // Filter: SelectColumnFilter

  },
  {
    Header: () => i18n.t("Price"),
    accessor: "price",
  },
  {
    Header: () => i18n.t("Unit"),
    accessor: "unit",
    Filter: SelectColumnFilter
  },
];

export default columnShape;