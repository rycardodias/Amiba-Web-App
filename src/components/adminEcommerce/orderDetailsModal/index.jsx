import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Divider, Modal, styled, Tab } from "@mui/material";
import React, { useState } from "react";
import InvoiceTab from "./InvoiceTab";
import OrderDetailsTab from "./OrderDetailsTab";
import PriceTab from "./PriceTab"; // component props interface

// styled component
const StyledTab = styled(Tab)(({
  theme
}) => ({
  fontSize: 13,
  minHeight: "auto",
  color: theme.palette.text.primary
}));

const OrderDetailsModal = ({
  openModal,
  closeModal,
  data
}) => {
  const [tabValue, setTabValue] = useState("1");

  const handleChange = (e, value) => {
    setTabValue(value);
  };

  return <Modal open={openModal} onClose={closeModal}>
      <Box sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: 700,
      minWidth: 370,
      width: "100%",
      backgroundColor: "background.paper",
      boxShadow: 2,
      borderRadius: "8px"
    }}>
        <TabContext value={tabValue}>
          <TabList onChange={handleChange} sx={{
          minHeight: 25,
          margin: "1.5rem 1rem"
        }}>
            <StyledTab label="Order Details" value="1" disableRipple />
            <StyledTab label="Price" value="2" disableRipple />
            <StyledTab label="Invoice" value="3" disableRipple />
          </TabList>

          <Divider />

          <TabPanel value="1">
            <OrderDetailsTab />
          </TabPanel>
          <TabPanel value="2">
            <PriceTab />
          </TabPanel>
          <TabPanel value="3">
            <InvoiceTab />
          </TabPanel>
        </TabContext>
      </Box>
    </Modal>;
};

export default OrderDetailsModal;