import { Add, Favorite } from "@mui/icons-material";
import { Box, Button, ButtonBase, Card, Grid, IconButton, Modal, Select, InputLabel, MenuItem, Stack, styled } from "@mui/material";
import { StyledModalCard } from "components/adminEcommerce/CreateProductModal";
import Heading from "components/adminEcommerce/Heading";
import { StyledPagination } from "components/dataTable/dataTableV2/styledComponents";
import FlexBox from "components/FlexBox";
import ModalAccordion from "components/shop/ModalAccordion";
import ProductCard from "components/shop/ProductCard";
import SearchFilter from "components/shop/SearchFilter";
import { H2, H3, H6 } from "components/Typography";
import useTitle from "hooks/useTitle";
import { CarouselProvider, Dot, Slide, Slider } from "pure-react-carousel";
import { useState, useEffect } from "react";
import { getProductsAllAvailable } from 'lib/requests/productsRequests'
import { useTranslation } from "react-i18next";
import { convertUnitNames } from "lib/values/convertions";
import toast from "react-hot-toast";
import { addItem } from 'lib/requests/specific/cartsAddProducts'

const ModalCard = styled(StyledModalCard)(({ theme }) => ({
  outline: "none", [theme.breakpoints.down("sm")]: { maxHeight: 400, overflow: "auto" }
}));
const CustomButton = styled(ButtonBase)(({ active, theme }) => ({
  fontSize: 13, border: "none", fontWeight: 600, color: active === "true" ? theme.palette.primary.main : "inherit"
}));
const CustomDot = styled(Dot)(() => ({
  width: 80, height: 70, padding: 0, border: "none", overflow: "hidden"
}));

const Shop = () => {
  const { t } = useTranslation()
  useTitle(t("Shop"));
  const [openModal, setOpenModal] = useState(false);

  const [data, setdata] = useState([])
  const [itemModal, setItemModal] = useState([])
  const [cartQuantity, setcartQuantity] = useState(1)

  useEffect(() => {
    async function fetchProducts() {
      const res = await getProductsAllAvailable()

      if (res.error) return
      if (res.data.error) return
      setdata(res.data.data)
    }
    fetchProducts()

  }, [])


  const addToCart = async () => {
    const newItemsResult = await addItem(itemModal, cartQuantity)
    if (newItemsResult.error) return toast.error(t("Fail to add product to cart!"));

    return toast.success(t("Item added to cart successfully!"));
  }

  const selectQuantity = () => {
    let items = [];
    let list = itemModal
    if (list.id) {

      if (list.unit === 'DOZEN') {
        for (let i = 1; i <= (list.quantityAvailable / 12); i++) {
          items.push(<MenuItem key={i} value={i * 12}>{i}</MenuItem>);
        }
      } else if (list.unit === 'KG') {
        let k = 0
        let totalweight = 0
        for (let j = 0; j < list.AnimalProducts.length; j++) {
          for (let i = 0; i < list.AnimalProducts[j].quantityAvailable; i++) {
            k++
            totalweight += list.AnimalProducts[j].weight
            items.push(<MenuItem key={k} value={k}>{k + ' - ' + totalweight / 1000 + ' Kg'}</MenuItem>);
          }
        }
      } else {
        for (let i = 1; i <= list.quantityAvailable; i++) {
          items.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
        }
      }
    }
    return <>
      <H6 id="quantityLabel">{`${t("Quantity")}:`}</H6>
      <Select style={{ height: 35 }} labelId="quantityLabel" id="quantity" label="quantity" value={cartQuantity} onChange={(e) => setcartQuantity(e.target.value)} >
        {items}
      </Select>
    </>
  }


  return <Box pt={2} pb={4}>
    <Heading heading={t("Amiba Ecommerce")} />
    <Box marginTop={3}>

      <Grid container spacing={3}>
        <Grid item lg={3} sm={4} xs={12}>
          <SearchFilter organizations={data} />
        </Grid>
        <Grid item lg={9} sm={8} xs={12}>
          <Card sx={{ padding: 3 }}>
            <Grid container spacing={3}>
              {data.map(item => <Grid item lg={4} md={6} xs={12} key={item.id}>
                <ProductCard product={item} handleClick={() => { setOpenModal(true); setItemModal(item) }} />
              </Grid>)}
            </Grid>

            {/* //TODO alterar o Count conforme o num páginas */}
            <Stack alignItems="center" marginTop={4}>
              <StyledPagination count={4} shape="rounded" //   onChange={handleChange}
              />
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>

    <Modal open={openModal} onClose={() => { setOpenModal(false); setcartQuantity(1) }}>
      <ModalCard>
        <Grid container spacing={3}>
          <Grid item sm={5} xs={12} sx={{ "& .carousel .carousel__dot--selected": { border: "2px solid #61A9FF !important" } }}>
            <CarouselProvider totalSlides={3} naturalSlideWidth={100} naturalSlideHeight={115}>
              <Slider style={{ marginBottom: 10 }}>
                <Slide >
                  <img alt={t("Product")} width="100%" height="100%" src={itemModal.image || "_"} style={{ objectFit: "cover" }} />
                </Slide>
              </Slider>
              {/* ADICIONAR QUANDO TIVER VÀRIAS IMAGENS */}
              {/* <FlexBox justifyContent="space-between">
                {[0, 1, 2].map(item => <CustomDot slide={item} key={item}>
                  <img alt={t("Product")} width="100%" height="100%" src={itemModal.image || "_"} style={{ objectFit: "cover" }} />
                </CustomDot>)}
              </FlexBox> */}
            </CarouselProvider>
          </Grid>
          <Grid item sm={7} xs={12}>
            <H3 mb={0.5}>{itemModal.name}</H3>
            <H6 fontWeight={500} color="text.disabled">
              {itemModal.description}
            </H6>

            <FlexBox width={200} marginTop={2} alignItems="center" justifyContent="space-between">
              {selectQuantity()}
            </FlexBox>

            <H2 fontWeight={700} marginTop={4}>
              {`${itemModal.price && itemModal.price.toFixed(2)}€ ${t(convertUnitNames(itemModal.unit))}`}
            </H2>
            <Box mt={1}>
              <Button disabled={cartQuantity === 0} onClick={addToCart} variant="contained" size="small" endIcon={<Add />}>{t("Add To Cart")}</Button>
              <IconButton sx={{ marginLeft: 1.5, backgroundColor: "secondary.200", "&:hover": { backgroundColor: "secondary.200" } }}>
                <Favorite disabled sx={{ color: "text.disabled" }} />
              </IconButton>
            </Box>

            <Box marginTop={3}>
              <ModalAccordion item={itemModal} />
            </Box>
          </Grid>
        </Grid>
      </ModalCard>
    </Modal>
  </Box>;
};


export default Shop;