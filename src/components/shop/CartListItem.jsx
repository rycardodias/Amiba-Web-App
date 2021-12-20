import { Add, Remove } from "@mui/icons-material";
import { Box, Button, ButtonBase, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import FlexBox from "components/FlexBox";
import { H3, Small } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import { useState } from "react"; // styled components

const StyledButton = styled(ButtonBase)(({
  theme
}) => ({
  width: 35,
  height: 35,
  borderRadius: "8px",
  backgroundColor: theme.palette.mode === "light" ? theme.palette.secondary[200] : theme.palette.divider
}));
const StyledCard = styled(Card)(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  padding: "1rem 2rem",
  marginBottom: "1.5rem",
  justifyContent: "space-between"
}));
const ButtonWrapper = styled(Box)(({
  theme
}) => ({
  [theme.breakpoints.down(868)]: {
    marginTop: 16
  }
})); // component props interface

const CartListItem = ({
  item
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  return <StyledCard>
      <FlexBox alignItems="center">
        <UkoAvatar src={item.image} sx={{
        width: 70,
        height: 70,
        borderRadius: "10%"
      }} />

        <Box marginLeft={2}>
          <H3>{item.name}</H3>
          <H3>${item.price}</H3>
          <Small color="text.disabled">
            {item.stock > 0 ? "In Stock" : "Out of Stock"}
          </Small>
        </Box>
      </FlexBox>

      <ButtonWrapper>
        {quantity > 0 ? <FlexBox alignItems="center">
            <StyledButton onClick={() => setQuantity(state => state + 1)}>
              <Add color="disabled" />
            </StyledButton>

            <H3 width={40} textAlign="center">
              {quantity}
            </H3>

            <StyledButton onClick={() => setQuantity(state => state > 0 ? state - 1 : state)}>
              <Remove color="disabled" />
            </StyledButton>
          </FlexBox> : <Button variant="contained" onClick={() => setQuantity(quantity + 1)}>
            Add To Cart
          </Button>}
      </ButtonWrapper>
    </StyledCard>;
};

export default CartListItem;