import i18n from 'i18next';
import { SelectColumnFilter } from 'components/backoffice/utils/columnFilters'

const columnShape = [
  {
    minWidth: 150,
    Header: () => i18n.t("Product"),
    accessor: "Product.name"
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Eggs Batch"),
    accessor: "EggsBatch.name",
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