import i18n from 'i18next';

const columnShape = [
  {
    minWidth: 150,
    Header: () => i18n.t("Order"),
    accessor: "OrderId",
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Animal/Product"),
    accessor: "AnimalProductId",
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Eggs Batch/Product"),
    accessor: "EggsBatchProductId"
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Quantity"),
    accessor: "quantity"
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