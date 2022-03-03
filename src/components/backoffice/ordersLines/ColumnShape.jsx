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
    accessor: "AnimalProduct.Product.name",
    Cell: ({ row }) => {
      // console.log(first)
      if (!row.original.AnimalProductId) return ""
      const { Animal, Product } = row.original.AnimalProduct;
      return `${Animal.identifier} / ${Product.name}`
    }
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Eggs Batch/Product"),
    accessor: "EggsBatchProduct.Product.name",
    Cell: ({ row }) => {
      if (!row.original.EggsBatchProduct) return ""
      const { EggsBatch, Product } = row.original.EggsBatchProduct;
      return `${EggsBatch.name} / ${Product.name}`
    }
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