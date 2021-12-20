import { Add, Favorite } from "@mui/icons-material";
import { Box, Button, ButtonBase, Card, Grid, IconButton, Modal, Stack, styled } from "@mui/material";
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
import { useState } from "react"; // styled components

const ModalCard = styled(StyledModalCard)(({
  theme
}) => ({
  outline: "none",
  [theme.breakpoints.down("sm")]: {
    maxHeight: 400,
    overflow: "auto"
  }
}));
const CustomButton = styled(ButtonBase)(({
  active,
  theme
}) => ({
  fontSize: 13,
  border: "none",
  fontWeight: 600,
  color: active === "true" ? theme.palette.primary.main : "inherit"
}));
const CustomDot = styled(Dot)(() => ({
  width: 80,
  height: 70,
  padding: 0,
  border: "none",
  overflow: "hidden"
}));

const Shop = () => {
  // change navbar title
  useTitle("Shop");
  const [openModal, setOpenModal] = useState(false);
  const [activeSize, setActiveSize] = useState("Small");
  return <Box pt={2} pb={4}>
      <Heading heading="Uko Ecommerce" />

      <Box marginTop={3}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={4} xs={12}>
            <SearchFilter />
          </Grid>
          <Grid item lg={9} sm={8} xs={12}>
            <Card sx={{
            padding: 3
          }}>
              <Grid container spacing={3}>
                {productList.map(item => <Grid item lg={4} md={6} xs={12} key={item.id}>
                    <ProductCard product={item} handleClick={() => setOpenModal(true)} />
                  </Grid>)}
              </Grid>

              <Stack alignItems="center" marginTop={4}>
                <StyledPagination count={4} shape="rounded" //   onChange={handleChange}
              />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalCard>
          <Grid container spacing={3}>
            <Grid item sm={5} xs={12} sx={{
            "& .carousel .carousel__dot--selected": {
              border: "2px solid #61A9FF !important"
            }
          }}>
              <CarouselProvider totalSlides={3} naturalSlideWidth={100} naturalSlideHeight={115}>
                <Slider style={{
                marginBottom: 10
              }}>
                  {[0, 1, 2].map(item => <Slide index={item} key={item}>
                      <img alt="" width="100%" height="100%" src="/static/products/airbud-2.png" style={{
                    objectFit: "cover"
                  }} />
                    </Slide>)}
                </Slider>
                <FlexBox justifyContent="space-between">
                  {[0, 1, 2].map(item => <CustomDot slide={item} key={item}>
                      <img alt="" width="100%" height="100%" src="/static/products/airbud-2.png" style={{
                    objectFit: "cover"
                  }} />
                    </CustomDot>)}
                </FlexBox>
              </CarouselProvider>
            </Grid>

            <Grid item sm={7} xs={12}>
              <H3 mb={0.5}>Lamp Light</H3>
              <H6 fontWeight={500} color="text.disabled">
                Built for natural motion, the flex and motion
              </H6>

              <FlexBox width={200} marginTop={2} alignItems="center" justifyContent="space-between">
                <H6>Sizes:</H6>
                {["Small", "Medium", "Big"].map(item => <CustomButton disableRipple key={item} onClick={() => setActiveSize(item)} active={(activeSize === item).toString()}>
                    {item}
                  </CustomButton>)}
              </FlexBox>

              <H2 fontWeight={700} marginTop={4}>
                $215
              </H2>
              <Box mt={1}>
                <Button variant="contained" size="small" endIcon={<Add />}>
                  Add To Cart
                </Button>
                <IconButton sx={{
                marginLeft: 1.5,
                backgroundColor: "secondary.200",
                "&:hover": {
                  backgroundColor: "secondary.200"
                }
              }}>
                  <Favorite sx={{
                  color: "text.disabled"
                }} />
                </IconButton>
              </Box>

              <Box marginTop={3}>
                <ModalAccordion />
              </Box>
            </Grid>
          </Grid>
        </ModalCard>
      </Modal>
    </Box>;
};

const productList = [{
  id: 1,
  name: "Nike airmax 170",
  description: "Rave BD",
  price: 215,
  rating: 4.5,
  image: "/static/products/shoe-8.png"
}, {
  id: 2,
  name: "Nike Off white",
  description: "Sneaker Pimps",
  price: 170,
  rating: 4.5,
  image: "/static/products/shoe-5.png"
}, {
  id: 3,
  name: "Nike Flyknit",
  description: "Fight Club",
  price: 340,
  rating: 4.5,
  image: "/static/products/shoe-6.png"
}, {
  id: 4,
  name: "Nike Airmax 270",
  description: "Rave BD",
  price: 150,
  rating: 4.5,
  image: "/static/products/shoe-7.png"
}, {
  id: 5,
  name: "Nike Roshe",
  description: "Rave BD",
  price: 150,
  rating: 4.5,
  image: "/static/products/shoe-9.png"
}, {
  id: 6,
  name: "Nike airmax 170",
  description: "Rave BD",
  price: 215,
  rating: 4.5,
  image: "/static/products/shoe-8.png"
}];
export default Shop;