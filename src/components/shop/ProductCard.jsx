import { Add, Favorite, Star } from "@mui/icons-material";
import { alpha, Box, Card, IconButton, useTheme } from "@mui/material";
import FlexBox from "components/FlexBox";
import { H3, H5, Small } from "components/Typography";

const ProductCard = ({
  product,
  handleClick
}) => {
  const theme = useTheme();
  return <Card sx={{
    border: 0,
    boxShadow: 2
  }}>
      <FlexBox onClick={handleClick} sx={{
      height: 135,
      cursor: "pointer",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "secondary.light",
      overflow: "hidden"
    }}>
        <img src={product.image} alt="Product" style={{
        objectFit: "cover",
        maxWidth: "100%"
      }} />
      </FlexBox>

      <Box padding={1.5} bgcolor={theme.palette.mode === "dark" ? alpha("#fff", 0.03) : ""}>
        <FlexBox alignItems="flex-start" justifyContent="space-between">
          <Box>
            <H5>{product.name}</H5>
            <Small fontWeight={500} color="text.disabled">
              {product.description}
            </Small>
          </Box>

          <FlexBox alignItems="center">
            <Star fontSize="small" color="warning" />
            <Small color="text.disabled">{product.rating}</Small>
          </FlexBox>
        </FlexBox>

        <FlexBox alignItems="center" justifyContent="space-between">
          <H3 fontWeight={700}>${product.price}</H3>

          <Box>
            <IconButton sx={{
            marginRight: 1,
            backgroundColor: "secondary.200",
            "&:hover": {
              backgroundColor: "secondary.200"
            }
          }}>
              <Favorite fontSize="small" color="disabled" />
            </IconButton>
            <IconButton sx={{
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.main"
            }
          }}>
              <Add fontSize="small" sx={{
              color: "white"
            }} />
            </IconButton>
          </Box>
        </FlexBox>
      </Box>
    </Card>;
};

export default ProductCard;