
import { Small, Tiny } from "components/Typography";
import FlexBox from "components/FlexBox";
import UkoAvatar from "components/UkoAvatar";
import i18n from 'i18next';
import { CommonCell, SelectColumnFilter, DateColumnFilter } from 'components/backoffice/utils/columnFilters'


const columnShape = [
  {
    minWidth: 150,
    Header: () => i18n.t("Code"),
    accessor: "certificationCode",
  },
  {
    Header: () => i18n.t("Initial Date"),
    accessor: "initialDate",
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Final Date"),
    accessor: "finalDate",
    Filter: DateColumnFilter
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Description"),
    accessor: "description",
  },
];


export default columnShape;