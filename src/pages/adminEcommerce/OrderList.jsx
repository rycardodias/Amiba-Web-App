import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import OrderColumnShape from "components/adminEcommerce/columnShapes/OrderColumnShape";
import CustomTable from "components/adminEcommerce/CustomTable";
import { ordersFakeData } from "components/adminEcommerce/fakeData";
import TabLabel from "components/adminEcommerce/TabLabel";
import SearchInput from "components/SearchInput";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const OrderList = () => {
  // change navbar title
  useTitle("Order List");
  const {
    t
  } = useTranslation();
  const [currentTab, setCurrentTab] = useState("1"); // handle tab item change

  const handleTabChange = (_, newValue) => {
    setCurrentTab(newValue);
  };

  const filteredData = ordersFakeData.filter(item => (item.status === "Paid" && currentTab === "2") || (item.status === "Unpaid" && currentTab === "3") || currentTab === "1");
  return <Box pt={2} pb={4}>
      <SearchInput placeholder="Find Orders" />

      <TabContext value={currentTab}>
        <TabList onChange={handleTabChange} sx={{
        my: 2
      }}>
          {tabs.map(({
          value,
          label,
          count
        }) => <Tab disableRipple value={value} label={<TabLabel title={t(label)} total={count} />} key={value} />)}
        </TabList>

        <CustomTable columnShape={OrderColumnShape} data={filteredData} />
      </TabContext>
    </Box>;
};

const tabs = [{
  value: "1",
  label: "All",
  count: 35
}, {
  value: "2",
  label: "Available",
  count: 45
}, {
  value: "3",
  label: "Disabled",
  count: 25
}];
export default OrderList;