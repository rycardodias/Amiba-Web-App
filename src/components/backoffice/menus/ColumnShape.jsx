
import i18n from 'i18next';

const columnShape = [
  {
    minWidth: 150,
    Header: () => i18n.t("Restaurant"),
    accessor: "Restaurant.name",
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Name"),
    accessor: "name",
  },
  {
    Header: () => i18n.t("Description"),
    accessor: "description",
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Active"),
    accessor: "active",
  },
];

export default columnShape;