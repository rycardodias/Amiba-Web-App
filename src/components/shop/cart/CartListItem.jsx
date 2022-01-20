import { Add, Remove, Delete } from "@mui/icons-material";
import { Box, Button, ButtonBase, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import FlexBox from "components/FlexBox";
import { H3, Small } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import { useState, useEffect } from "react"; // styled components
import { calcPrice } from "./priceCalculations";
import * as cartsRequests from 'lib/requests/cartsRequests'
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import * as uploadFilesRequests from 'lib/requests/uploadFilesRequests'

const StyledButton = styled(ButtonBase)(({ theme }) => ({
  width: 35, height: 35, borderRadius: "8px", backgroundColor: theme.palette.mode === "light" ? theme.palette.secondary[200] : theme.palette.divider
}));

const StyledCard = styled(Card)(() => ({ display: "flex", flexWrap: "wrap", alignItems: "center", padding: "1rem 2rem", marginBottom: "1.5rem", justifyContent: "space-between" }));

const ButtonWrapper = styled(Box)(({ theme }) => ({ [theme.breakpoints.down(868)]: { marginTop: 16 } }));

const CartListItem = ({ item, removeItemList }) => {
  const { t } = useTranslation()
  const [quantity, setQuantity] = useState(item.quantity);

  async function handleSumArticleQuantity(quantity) {
    const { AnimalProductId, EggsBatchProductId, } = item
    const res = await cartsRequests.createCart(AnimalProductId, EggsBatchProductId, quantity)

    if (res.error || res.data.error) return toast.error(t("Error Changing Quantity"));

    return setQuantity(state => state + quantity)
  }

  useEffect(() => {
    setQuantity(item.quantity)
  }, [])

  async function handleDelete() {
    const { id } = item
    const res = await cartsRequests.deleteCart(id)

    if (res.error || res.data.error) return toast.error(t("Error Removing Cart Item"));

    removeItemList(item.id)
  }

  async function getImage(image) {
    const res = await uploadFilesRequests.getFile(`16x9_${image}`)
    console.log(res);
  }

  const image = item.AnimalProduct ? item.AnimalProduct.Product.image : item.EggsBatchProduct.Product.image;

  return <StyledCard>
    <FlexBox alignItems="center">
      <UkoAvatar src={getImage(image)} sx={{ width: 70, height: 70, borderRadius: "10%" }} />

      <Box marginLeft={2}>
        <H3>{item.AnimalProduct ? item.AnimalProduct.Product.name : item.EggsBatchProduct.Product.name}</H3>
        <H3>{calcPrice(item)}€</H3>
        <Small color="text.disabled">
          {item.stock !== 0 ? "In Stock" : "Out of Stock"}
        </Small>
      </Box>
    </FlexBox>

    <ButtonWrapper>
      {quantity > 0 ? <FlexBox alignItems="center">
        <StyledButton onClick={() => handleSumArticleQuantity(1)}>
          <Add color="disabled" />
        </StyledButton>

        <H3 width={40} textAlign="center">
          {quantity}
        </H3>

        <StyledButton onClick={() => handleSumArticleQuantity(-1)}>
          <Remove color="disabled" />
        </StyledButton>
      </FlexBox> :
        <FlexBox alignItems="center">
          <StyledButton onClick={handleDelete}>
            <Delete color="danger" />
          </StyledButton>
          <H3 width={10} textAlign="center"> </H3>
          <Button variant="contained" onClick={() => handleSumArticleQuantity(1)}>
            {t("Add To Cart")}
          </Button>

        </FlexBox>
      }
    </ButtonWrapper>
  </StyledCard >;
};

export default CartListItem;