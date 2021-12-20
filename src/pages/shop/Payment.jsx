import { Box, Card, Grid } from "@mui/material";
import LightTextField from "components/LightTextField";
import OrderSummery from "components/shop/OrderSummery";
import { Small } from "components/Typography";
import useTitle from "hooks/useTitle";

const Payment = () => {
  // change navbar title
  useTitle("Payment");
  return <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        <Grid item lg={8} md={7} sm={7} xs={12}>
          <Card sx={{
          padding: 3
        }}>
            <Grid container spacing={3}>
              <Grid item xs={7}>
                <Box py={1}>
                  <Small display="block" mb={1}>
                    Card Number
                  </Small>
                  <LightTextField fullWidth type="number" />
                </Box>
                <Box py={1}>
                  <Small display="block" mb={1}>
                    Expiration
                  </Small>
                  <LightTextField fullWidth type="number" />
                </Box>
                <Box py={1}>
                  <Small display="block" mb={1}>
                    Secure Code
                  </Small>
                  <LightTextField fullWidth type="number" />
                </Box>
              </Grid>
              <Grid item xs={5}>
                <img alt="" src="/static/illustration/payment-page.svg" style={{
                padding: 10,
                display: "block",
                marginLeft: "auto"
              }} />
              </Grid>
            </Grid>
          </Card>

          <Card sx={{
          padding: 3,
          marginTop: 3
        }}>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Small display="block" mb={1}>
                  Address
                </Small>
                <LightTextField fullWidth />
              </Grid>
              <Grid item md={6} xs={12}>
                <Small display="block" mb={1}>
                  Town/City
                </Small>
                <LightTextField fullWidth />
              </Grid>
              <Grid item md={6} xs={12}>
                <Small display="block" mb={1}>
                  Mobile Number
                </Small>
                <LightTextField fullWidth type="number" />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item lg={4} md={5} sm={5} xs={12}>
          <OrderSummery btnText="Order" />
        </Grid>
      </Grid>
    </Box>;
};

export default Payment;