import i18n from 'i18next';

const columnShape = [
  {
    minWidth: 150,
    Header: () => i18n.t("User"),
    accessor: "User.name"
  },
  {
    minWidth: 150,
    Header: () => i18n.t("VAT Number"),
    accessor: "fiscalNumber"
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Total"),
    accessor: "total"
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Total VAT"),
    accessor: "totalVAT"
  },
];


export default columnShape;