
import { Small, Tiny } from "components/Typography";
import FlexBox from "components/FlexBox";
import UkoAvatar from "components/UkoAvatar";
import { useState } from "react"; // common cell component
import EditIconButton from "components/EditIconButton";
import AddOrganizationsModal from "./AddOrganizationsModal";
import i18n from 'i18next';
import { CommonCell, SelectColumnFilter, DateColumnFilter } from 'components/backoffice/utils/columnFilters'


const columnShape = [{
  minWidth: 200,
  Header: () => i18n.t("Name"),
  accessor: "name",
  Cell: ({ row }) => {
    const { avatar, name, id } = row.original;
    return <FlexBox alignItems="center">
      <UkoAvatar alt={name} src={avatar} />
      <FlexBox flexDirection="column" ml={1.2}>
        <Small mb={0.5}>{name}</Small>
        <Tiny color="text.disabled">{id}</Tiny>
      </FlexBox>
    </FlexBox>;
  }
}, {
  Header: () => i18n.t("Type"),
  accessor: "type",
  Filter: SelectColumnFilter,
  Cell: ({ row }) => {
    const { type, experience } = row.original;
    return <CommonCell title={type} body={experience} />;
  }
},
{
  minWidth: 150,
  Header: () => i18n.t("VAT Number"),
  accessor: "fiscalNumber",
},
{
  minWidth: 150,
  Header: () => i18n.t("Responsable"),
  accessor: "User.name",
  Filter: SelectColumnFilter
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
  Filter: SelectColumnFilter
}, {
  Header: " ",
  Cell: ({ row }) => {
    const [openModal, setOpenModal] = useState(false);
    return <>
      <EditIconButton onClick={() => setOpenModal(true)} />
      <AddOrganizationsModal edit open={openModal} data={row.original} onClose={() => setOpenModal(false)} />
    </>;
  }
}];


export default columnShape;