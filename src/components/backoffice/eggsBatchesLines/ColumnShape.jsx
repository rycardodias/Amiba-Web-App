import i18n from 'i18next';
import { SelectColumnFilter } from 'components/backoffice/utils/columnFilters'


const columnShape = [
  {
    minWidth: 150,
    Header: () => i18n.t("Exploration"),
    accessor: "EggsBatch.Exploration.name"
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Eggs Batch"),
    accessor: "EggsBatch.name",
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Quantity"),
    accessor: "quantity",
  },
];


export default columnShape;