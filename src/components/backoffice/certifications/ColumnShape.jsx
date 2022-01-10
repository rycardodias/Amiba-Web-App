
import i18n from 'i18next';
import { DateColumnFilter } from 'components/backoffice/utils/columnFilters'


const columnShape = [
  {
    minWidth: 150,
    Header: () => i18n.t("Code"),
    accessor: "certificationCode",
  },
  {
    Header: () => i18n.t("Initial Date"),
    accessor: "initialDate",
    Filter: DateColumnFilter
  },
  {
    Header: () => i18n.t("Final Date"),
    accessor: "finalDate",
    Filter: DateColumnFilter
  },
  {
    minWidth: 300,
    Header: () => i18n.t("Description"),
    accessor: "description",
  },
];


export default columnShape;