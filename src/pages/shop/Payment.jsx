import { Box, Card, Grid } from "@mui/material";
import LightTextField from "components/LightTextField";
import OrderSummery from "components/shop/cart/OrderSummery";
import { Small } from "components/Typography";
import useTitle from "hooks/useTitle";
import { useState, useEffect } from "react";
import * as cartsRequests from 'lib/requests/cartsRequests'
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";


const Payment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  // change navbar title
  useTitle(t("Payment"));


  const [data, setdata] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function fetchProducts() {
    setIsLoading(true)
    const res = await cartsRequests.getCartByUser()
    if (res.error) return
    if (res.data.error) return
    setdata(res.data.data)
    console.log(res.data.data);
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return <Box pt={2} pb={4}>
    <Grid container spacing={3}>
      <Grid item lg={8} md={7} sm={7} xs={12}>
        <Card sx={{ padding: 3 }}>
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

        <Card sx={{ padding: 3, marginTop: 3 }}>
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
        <OrderSummery btnText={t("Order")} data={data} />
      </Grid>
    </Grid>
  </Box>;
};

export default Payment;