import React, { useState } from 'react'
import FlexBox from "components/FlexBox";
import ModalAccordion from "components/shop/ModalAccordion";
import { Add, Favorite } from "@mui/icons-material";
import { convertUnitNames } from "lib/values/convertions";
import { Box, Button, ButtonBase, Card, Grid, IconButton, Modal, Select, InputLabel, MenuItem, Stack, styled } from "@mui/material";
import { CarouselProvider, Dot, Slide, Slider } from "pure-react-carousel";
import { H2, H3, H6 } from "components/Typography";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
// import { addItem } from 'lib/requests/specific/cartsAddProducts'
import { StyledModalCard } from 'components/backoffice/styledComponents/AddModalStyles'
import * as cartsRequests from 'lib/requests/cartsRequests'

const ModalCard = styled(StyledModalCard)(({ theme }) => ({
    outline: "none", [theme.breakpoints.down("sm")]: { maxHeight: 400, overflow: "auto" }
}));

const ShopItemModal = (props) => {
    const { t } = useTranslation()

    const [cartQuantity, setcartQuantity] = useState(1)

    const selectQuantity = () => {
        let items = [];
        let list = props.itemModal
        if (list.id) {

            if (list.unit === 'DOZEN') {
                for (let i = 1; i <= (list.quantityAvailable / 12); i++) {
                    items.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
                }
            }
            // else if (list.unit === 'KG') {
            //     let k = 0
            //     let totalweight = 0
            //     for (let j = 0; j < list.AnimalProducts.length; j++) {
            //         for (let i = 0; i < list.AnimalProducts[j].quantityAvailable; i++) {
            //             k++
            //             totalweight += list.AnimalProducts[j].weight

            //             items.push(<MenuItem key={k} value={k}>{k + ' - ' + totalweight / 1000 + ' Kg'}</MenuItem>);
            //         }
            //     }
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

const addToCart = async () => {
    const res = await cartsRequests.createCart(props.itemModal.id, cartQuantity)
    if (res.error || res.data.error) return toast.error(t("Fail to add product to cart!"));
    return toast.success(t("Item added to cart successfully!"));

    // addItem(props.itemModal, cartQuantity)
    //     .then(response => {
    //         if (response.error || response.data.error) return toast.error(t("Fail to add product to cart!"));
    //         return toast.success(t("Item added to cart successfully!"));
    //     })
    //     .catch(error => {
    //         console.error(error)
    //         return toast.error(t("Fail to add product to cart!"));
    //     })
}

return (
    <Modal open={props.open} onClose={() => { props.onModalClose(); setcartQuantity(1) }}>
        <ModalCard>
            <Grid container spacing={3}>
                <Grid item sm={5} xs={12} sx={{ "& .carousel .carousel__dot--selected": { border: "2px solid #61A9FF !important" } }}>
                    <CarouselProvider totalSlides={3} naturalSlideWidth={100} naturalSlideHeight={115}>
                        <Slider style={{ marginBottom: 10 }}>
                            <Slide >
                                <img alt={t("Product")} width="100%" height="100%"
                                    src={`${process.env.REACT_APP_BACKEND_SERVER_URL}uploadFiles/1920x1080_${props.itemModal.image}`} style={{ objectFit: "cover" }} />
                            </Slide>
                        </Slider>
                        {/* ADICIONAR QUANDO TIVER VÀRIAS IMAGENS */}
                        {/* <FlexBox justifyContent="space-between">
                                {[0, 1, 2].map(item => <CustomDot slide={item} key={item}>
                                <img alt={t("Product")} width="100%" height="100%" src={props.itemModal.image || "_"} style={{ objectFit: "cover" }} />
                                </CustomDot>)}
                            </FlexBox> */}
                    </CarouselProvider>
                </Grid>
                <Grid item sm={7} xs={12}>
                    <H3 mb={0.5}>{props.itemModal.name}</H3>
                    <H6 fontWeight={500} color="text.disabled">
                        {props.itemModal.description}
                    </H6>

                    <FlexBox width={200} marginTop={2} alignItems="center" justifyContent="space-between">
                        {selectQuantity()}
                    </FlexBox>

                    <H2 fontWeight={700} marginTop={4}>
                        {`${props.itemModal.price && props.itemModal.price.toFixed(2)}€ ${t(convertUnitNames(props.itemModal.unit))}`}
                    </H2>
                    <Box mt={1}>
                        <Button disabled={cartQuantity === 0} onClick={addToCart}
                            variant="contained" size="small" endIcon={<Add />}>{t("Add To Cart")}</Button>
                        <IconButton sx={{ marginLeft: 1.5, backgroundColor: "secondary.200", "&:hover": { backgroundColor: "secondary.200" } }}>
                            <Favorite disabled sx={{ color: "text.disabled" }} />
                        </IconButton>
                    </Box>

                    <Box marginTop={3}>
                        <ModalAccordion item={props.itemModal} />
                    </Box>
                </Grid>
            </Grid>
        </ModalCard>
    </Modal>
)
}

export default ShopItemModal;