import { Box, Card, Grid } from "@mui/material";
import LightTextField from "components/LightTextField";
import OrderSummery from "components/shop/cart/OrderSummery";
import { Small } from "components/Typography";
import useTitle from "hooks/useTitle";
import { useState, useEffect } from "react";
import * as cartsRequests from 'lib/requests/cartsRequests'
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { createOrderOrderLines } from "lib/requests/specific/transactions";


const Payment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  // change navbar title
  useTitle(t("Payment"));

  const [shipping, setshipping] = useState({
    address: "",
    locale: "",
    zipcode: "",
    fiscalNumber: ""
  });

  const [data, setdata] = useState([])
  // const [isLoading, setIsLoading] = useState(true)

  async function fetchProducts() {
    // setIsLoading(true)
    const res = await cartsRequests.getCartByUser()
    if (res.error) return
    if (res.data.error) return
    setdata(res.data.data)
    // setIsLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  async function handleBtnClick() {
    console.log(data);
    const res = await createOrderOrderLines(data, shipping.address, shipping.locale, shipping.zipcode, undefined, shipping.fiscalNumber)
    if (res.error || res.data.error) return console.error(res);
    navigate("/shop/payment-success")
  }

  function handleChange(e) {
    setshipping({ [e.target.name]: e.target.value })

  }

  return <Box pt={2} pb={4}>
    <Grid container spacing={3}>
      <Grid item lg={8} md={7} sm={7} xs={12}>
        {/* <Card sx={{ padding: 3 }}>
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
        </Card> */}

        <Card sx={{ padding: 3, marginTop: 3 }}>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Small display="block" mb={1}>
                {t('Address')}
              </Small>
              <LightTextField fullWidth onChange={handleChange} name="address" value={shipping.address} />
            </Grid>
            <Grid item md={6} xs={12}>
              <Small display="block" mb={1}>
                {t('Locale')}
              </Small>
              <LightTextField fullWidth onChange={handleChange} name="locale" value={shipping.locale} />
            </Grid>
            <Grid item md={6} xs={12}>
              <Small display="block" mb={1}>
                {t('Zip Code')}
              </Small>
              <LightTextField fullWidth onChange={handleChange} name="zipcode" value={shipping.zipcode} />
            </Grid>
            <Grid item md={6} xs={12}>
              <Small display="block" mb={1}>
                {t('Fiscal Number')}
              </Small>
              <LightTextField fullWidth onChange={handleChange} name="fiscalNumber" value={shipping.fiscalNumber} />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item lg={4} md={5} sm={5} xs={12}>
        <OrderSummery btnText="Order" data={data} btnClick={handleBtnClick} />
      </Grid>
    </Grid>
  </Box>;
};

export default Payment;