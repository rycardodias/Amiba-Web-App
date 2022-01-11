import i18n from 'i18next';
import { SelectColumnFilter, DateColumnFilter } from 'components/backoffice/utils/columnFilters'

const columnShape = [
  {
    minWidth: 150,
    Header: () => i18n.t("Exploration"),
    accessor: "Exploration.name",
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Identifier"),
    accessor: "identifier",
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Race"),
    accessor: "race",
    Filter: SelectColumnFilter
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Gender"),
    accessor: "gender",
    Filter: SelectColumnFilter
  },
  {
    Header: () => i18n.t("Birth Date"),
    accessor: "birthDate",
    Filter: DateColumnFilter
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Weight"),
    accessor: "weight",
  },

];


export default columnShape;