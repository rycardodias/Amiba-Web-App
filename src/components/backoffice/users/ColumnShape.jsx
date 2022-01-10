
import { Small, Tiny } from "components/Typography";
import FlexBox from "components/FlexBox";
import UkoAvatar from "components/UkoAvatar";
import i18n from 'i18next';
import { CommonCell, SelectColumnFilter, DateColumnFilter } from 'components/backoffice/utils/columnFilters'


const columnShape = [
  {
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
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Email"),
    accessor: "email",
  },
  {
    minWidth: 150,
    Header: () => i18n.t("Permission"),
    accessor: "permission",
    Filter: SelectColumnFilter
  }, {
    minWidth: 150,
    Header: () => i18n.t("Phone/Mobile"),
    accessor: "telephone",
    Cell: ({ row }) => {
      const { telephone, mobilePhone } = row.original;
      return <CommonCell title={telephone} body={mobilePhone} />;
    }
  }
];


export default columnShape;