import i18n from 'i18next';
import { SelectColumnFilter } from 'components/backoffice/utils/columnFilters'


const columnShape = [
  {
    minWidth: 150,
    Header: () => i18n.t("Exploration"),
    accessor: "Exploration.name",
    Filter: SelectColumnFilter
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