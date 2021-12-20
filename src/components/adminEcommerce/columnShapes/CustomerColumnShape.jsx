import EditIconButton from "components/EditIconButton";
import FlexBox from "components/FlexBox";
import { H6, Small, Tiny } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import { useState } from "react";
import AddCustomerModal from "../AddCustomerModal";
const CustomerColumnShape = [{
  Header: "Customer Name",
  accessor: "customer",
  minWidth: 200,
  Cell: ({
    row
  }) => {
    const {
      avatar,
      name,
      position
    } = row.original;
    return <FlexBox alignItems="center">
          <UkoAvatar src={avatar} />
          <FlexBox flexDirection="column" ml={1.5}>
            <H6 color="text.primary">{name}</H6>
            <Tiny color="text.disabled">{position}</Tiny>
          </FlexBox>
        </FlexBox>;
  }
}, {
  Header: "Location",
  accessor: "location",
  minWidth: 200
}, {
  Header: "Date",
  accessor: "date",
  minWidth: 150
}, {
  Header: "Phone",
  accessor: "phone",
  minWidth: 150
}, {
  Header: "Status",
  accessor: "status",
  minWidth: 130,
  maxWidth: 130,
  Cell: ({
    value
  }) => <Small sx={{
    backgroundColor: value.toLowerCase() === "active" ? "success.main" : "error.main",
    color: "background.paper",
    borderRadius: 10,
    padding: ".2rem 1rem"
  }}>
        {value}
      </Small>
}, {
  Header: "Action",
  accessor: "action",
  maxWidth: 100,
  Cell: ({
    row
  }) => {
    const [openModal, setOpenModal] = useState(false);
    return <>
          <EditIconButton onClick={() => setOpenModal(true)} />

          <AddCustomerModal edit open={openModal} data={row.original} onClose={() => setOpenModal(false)} />
        </>;
  }
}];
export default CustomerColumnShape;