import { Box, Grid } from "@mui/material";
import CartListItem from "components/shop/cart/CartListItem";
import OrderSummery from "components/shop/cart/OrderSummery";
import useTitle from "hooks/useTitle";
import { useTranslation } from "react-i18next";
import * as cartsRequests from 'lib/requests/cartsRequests'
import { useState, useEffect } from "react";


const Cart = () => {
  const { t } = useTranslation()
  // change navbar title
  useTitle(t("Cart"));

  const [data, setdata] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  async function fetchProducts() {
    const res = await cartsRequests.getCartByUserWithProduct()
    if (res.error) return
    if (res.data.error) return
    setdata(res.data.data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  function handleRemoveItem(id) {
    setIsLoading(true)
    const remainingItems = data.filter(item => item.id !== id)
    setdata(remainingItems)
    setIsLoading(false)
  }


  return <Box pt={2} pb={4}>
    <Grid container spacing={3}>
      <Grid item md={7} sm={7} xs={12}>
        {!isLoading && data.map((item, index) => <CartListItem key={index} item={item} removeItemList={handleRemoveItem} />)}
      </Grid>
      <Grid item md={5} sm={5} xs={12}>
        <OrderSummery data={data} />
      </Grid>
    </Grid>
  </Box>;
};

export default Cart;