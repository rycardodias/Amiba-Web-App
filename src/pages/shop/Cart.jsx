import { Box, Grid } from "@mui/material";
import CartListItem from "components/shop/cart/CartListItem";
import OrderSummery from "components/shop/cart/OrderSummery";
import useTitle from "hooks/useTitle";
import { useTranslation } from "react-i18next";
import * as cartsRequests from 'lib/requests/cartsRequests'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";


const Cart = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // change navbar title
  useTitle(t("Cart"));

  const [data, setdata] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  async function fetchProducts() {
    setIsLoading(true)
    const res = await cartsRequests.getCartByUser() //getCartByUserWithProduct()  
    if (res.error) return
    if (res.data.error) return
    setdata(res.data.data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  function handleRemoveItem(id) {
    // setIsLoading(true)
    // const remainingItems = data.filter(item => item.id !== id)
    // setdata(remainingItems)
    fetchProducts()
    // setIsLoading(false)
  }

  function handleRefreshQuantity(item, quantity) {
    setIsLoading(true)
    const items = data;
    const newData = items.map(artigo => {
      if (artigo.id === item.id) artigo.quantity += quantity
      return artigo
    })
    setdata(newData)
    setIsLoading(false)
  }

  function handleBtnClick() {
    navigate("/shop/payment")
  }


  return <Box pt={2} pb={4}>
    <Grid container spacing={3}>
      <Grid item md={7} sm={7} xs={12}>
        {/* {!isLoading && console.log('data', data)} */}
        {!isLoading && data.map((item, index) => <CartListItem key={index} item={item}  removeItemList={handleRemoveItem} refreshQuantity={handleRefreshQuantity} />)}
      </Grid>
      <Grid item md={5} sm={5} xs={12}>
        <OrderSummery data={data} btnClick={handleBtnClick} />
      </Grid>
    </Grid>
  </Box>;
};

export default Cart;