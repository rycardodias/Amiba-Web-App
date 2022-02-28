
import i18n from 'i18next';
import { CommonCell } from 'components/backoffice/utils/columnFilters'


const columnShape = [
  {
    minWidth: 200,
    Header: () => i18n.t("Name"),
    accessor: "name",
  },
  {
    minWidth: 150,
    Header: () => i18n.t("VAT Number"),
    accessor: "fiscalNumber",
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Responsable"),
    accessor: "User.name"
  }, {
    minWidth: 150,
    Header: () => i18n.t("Phone/Mobile"),
    accessor: "telephone",
    Cell: ({ row }) => {
      const { telephone, mobilePhone } = row.original;
      return <CommonCell title={telephone} body={mobilePhone} />;
    }
  },
  {
    minWidth: 150,
    Header: () => i18n.t("ZIP Code"),
    accessor: "zipcode",
    Cell: ({ row }) => {
      const { zipcode, locale } = row.original;
      return <CommonCell title={zipcode} body={locale} />;
    }
  },
  {
    minWidth: 170,
    Header: () => i18n.t("Address"),
    accessor: "address",
  }];


export default columnShape;