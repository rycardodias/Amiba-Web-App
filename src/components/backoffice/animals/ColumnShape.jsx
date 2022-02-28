import i18n from 'i18next';
import { SelectColumnFilter, DateColumnFilter } from 'components/backoffice/utils/columnFilters'
import { Done, Clear } from "@mui/icons-material";
import { genders, races } from 'lib/values/types';

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
    Filter: SelectColumnFilter,
    Cell: ({ row }) => {
      const { race } = row.original;
      return i18n.t(races.find(item => item.id === race).name)
    }
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Gender"),
    accessor: "gender",
    Filter: SelectColumnFilter,
    Cell: ({ row }) => {
      const { gender } = row.original;
      return i18n.t(genders.find(item => item.id === gender).name)
    }
  },
  {
    Header: () => i18n.t("Birth Date"),
    accessor: "birthDate",
    Filter: DateColumnFilter
  },
  // {
  //   minWidth: 150,
  //   Header: () => i18n.t("Weight"),
  //   accessor: "weight",
  // },
  {
    // minWidth: 150,
    Header: () => i18n.t("Validated"),
    accessor: "validated",
    Filter: SelectColumnFilter,
    Cell: ({ row }) => {
      const { validated } = row.original;
      return validated ? <Done /> : <Clear />;
    }
  },

];


export default columnShape;