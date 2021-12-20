import { Add } from "@mui/icons-material";
import { TabContext, TabList } from "@mui/lab";
import { Box, Button, Tab } from "@mui/material";
import AddCustomerModal from "components/adminEcommerce/AddCustomerModal";
import CustomerColumnShape from "components/adminEcommerce/columnShapes/CustomerColumnShape";
import CustomTable from "components/adminEcommerce/CustomTable";
import { customersFakeData } from "components/adminEcommerce/fakeData";
import TabLabel from "components/adminEcommerce/TabLabel";
import SearchInput from "components/SearchInput";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { HeadingWrapper } from "./ProductList";

const CustomerList = () => {
  // change navbar title
  useTitle("Customer List");
  const {
    t
  } = useTranslation();
  const [currentTab, setCurrentTab] = useState("1");
  const [addCustomer, setAddCustomer] = useState(false); // handle tab item change

  const handleTabChange = (_, newValue) => {
    setCurrentTab(newValue);
  };

  const filteredData = customersFakeData.filter(item => (item.status === "Active" && currentTab === "2") || (item.status === "Blocked" && currentTab === "3") || currentTab === "1");
  return <Box pt={2} pb={4}>
      <HeadingWrapper justifyContent="space-between" alignItems="center">
        <SearchInput placeholder="Find Customer" />

        <Button variant="contained" endIcon={<Add />} onClick={() => setAddCustomer(true)}>
          {t("Add Customer")}
        </Button>

        <AddCustomerModal open={addCustomer} onClose={() => setAddCustomer(false)} />
      </HeadingWrapper>

      <TabContext value={currentTab}>
        <TabList onChange={handleTabChange} variant="scrollable" sx={{
        mb: 1
      }}>
          {tabs.map(({
          value,
          label,
          count
        }) => <Tab disableRipple value={value} label={<TabLabel title={t(label)} total={count} />} key={value} />)}
        </TabList>

        <CustomTable data={filteredData} columnShape={CustomerColumnShape} />
      </TabContext>
    </Box>;
};

const tabs = [{
  value: "1",
  label: "All",
  count: 35
}, {
  value: "2",
  label: "Active",
  count: 45
}, {
  value: "3",
  label: "Blocked",
  count: 25
}];
export default CustomerList;