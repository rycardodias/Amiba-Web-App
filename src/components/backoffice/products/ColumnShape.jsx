
import i18n from 'i18next';
import { SelectColumnFilter } from 'components/backoffice/utils/columnFilters'
import { productTypes } from 'lib/values/types';


const columnShape = [
  {
    minWidth: 150,
    Header: () => i18n.t("Name"),
    accessor: "name",
  },
  {
    Header: () => i18n.t("Type"),
    accessor: "type",
    // Filter: SelectColumnFilter,
    Cell: ({ row }) => {
      const { type } = row.original;
      return i18n.t(productTypes.find(item => item.id === type).name)
    }
  },
  {
    Header: () => i18n.t("Tax"),
    accessor: "tax",
    // Filter: SelectColumnFilter
    Cell: ({ row }) => {
      const { tax } = row.original;
      return `${tax}%`
    }

  },
  {
    Header: () => i18n.t("Price"),
    accessor: "price",
    Cell: ({ row }) => {
      const { price } = row.original;
      return `${price}€`
    }
  },
  // {
  //   Header: () => i18n.t("Unit"),
  //   accessor: "unit",
  //   Filter: SelectColumnFilter
  // },
];

export default columnShape;