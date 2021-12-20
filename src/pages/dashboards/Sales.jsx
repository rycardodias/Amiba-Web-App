import { AttachMoney, Autorenew } from "@mui/icons-material";
import { Box, Grid, useTheme } from "@mui/material";
import CardItem from "components/Dashboards/sales/CardItem";
import EarningReport from "components/Dashboards/sales/EarningReport";
import PopularProducts from "components/Dashboards/sales/PopularProducts";
import RecentOrders from "components/Dashboards/sales/RecentOrders";
import SalesByCountry from "components/Dashboards/sales/SalesByCountry";
import SalesProductDetails from "components/Dashboards/sales/SalesProductDetails";
import TotalSales from "components/Dashboards/sales/TotalSales";
import WishCard from "components/Dashboards/sales/WishCard";
import useTitle from "hooks/useTitle";
import EarningIcon from "icons/EarningIcon";
import PeopleIcon from "icons/PeopleIcon";

const Sales = () => {
  // change navbar title
  useTitle("Sales");
  const theme = useTheme();
  const cardList = [{
    title: "Revenue",
    amount: 35800,
    Icon: EarningIcon,
    color: theme.palette.primary.main,
    percentage: 10.23
  }, {
    title: "Repeat Purchase",
    amount: 12900,
    Icon: Autorenew,
    color: theme.palette.primary.purple,
    percentage: 20.4
  }, {
    title: "Average Order",
    amount: 42000,
    Icon: AttachMoney,
    color: theme.palette.primary.red,
    percentage: 10.23
  }, {
    title: "New Customers",
    amount: 689,
    Icon: PeopleIcon,
    color: theme.palette.primary.yellow,
    percentage: 10.23
  }];
  return <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <WishCard />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Box width="100%" height="100%">
            <Grid container spacing={3}>
              {cardList.map((item, index) => <Grid key={index} item xs={12} sm={6} md={3} lg={6}>
                  <CardItem Icon={item.Icon} title={item.title} amount={item.amount} color={item.color} percentage={item.percentage} />
                </Grid>)}
            </Grid>
          </Box>
        </Grid>

        <Grid item lg={9} md={8} xs={12}>
          <EarningReport />
        </Grid>
        <Grid item lg={3} md={4} xs={12}>
          <TotalSales />
        </Grid>

        <Grid item lg={9} md={8} xs={12}>
          <PopularProducts />
        </Grid>
        <Grid item lg={3} md={4} xs={12}>
          <RecentOrders />
        </Grid>

        <Grid item lg={9} md={8} xs={12}>
          <SalesByCountry />
        </Grid>
        <Grid item lg={3} md={4} xs={12}>
          <SalesProductDetails />
        </Grid>
      </Grid>
    </Box>;
};

export default Sales;