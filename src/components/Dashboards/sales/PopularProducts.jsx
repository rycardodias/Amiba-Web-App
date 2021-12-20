import { Box, Card, styled, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { H5, Small } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import ScrollBar from "simplebar-react";
const commonCSS = {
  minWidth: 120,
  "&:nth-of-type(1)": {
    minWidth: 170
  }
}; // Styled components

const HeadTableCell = styled(TableCell)(({
  theme
}) => ({
  fontSize: 12,
  fontWeight: 600,
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:first-of-type": {
    paddingLeft: 0
  },
  "&:last-of-type": {
    paddingRight: 0
  }
}));
const BodyTableCell = styled(TableCell)(({
  theme
}) => ({
  padding: 0,
  fontSize: 12,
  fontWeight: 500,
  paddingLeft: "1rem",
  paddingTop: "0.7rem",
  "&:first-of-type": {
    paddingLeft: 0
  },
  "&:last-of-type": {
    paddingRight: 0
  },
  [theme.breakpoints.down("sm")]: { ...commonCSS
  },
  [theme.breakpoints.between(960, 1270)]: { ...commonCSS
  }
}));

const PopularProducts = () => {
  const {
    t
  } = useTranslation();
  return <Card sx={{
    padding: "2rem"
  }}>
      <H5>{t("Popular Products")}</H5>

      <ScrollBar>
        <Table>
          <TableHead>
            <TableRow>
              <HeadTableCell>Product</HeadTableCell>
              <HeadTableCell>Date</HeadTableCell>
              <HeadTableCell>Category</HeadTableCell>
              <HeadTableCell>Brand</HeadTableCell>
              <HeadTableCell>Price</HeadTableCell>
              <HeadTableCell>Status</HeadTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productList.map((item, index) => <TableRow key={index}>
                <BodyTableCell>
                  <Box display="flex" alignItems="center">
                    <UkoAvatar src={item.image} alt={item.name} sx={{
                  borderRadius: "15%"
                }} />
                    <Small ml="1rem">{item.name}</Small>
                  </Box>
                </BodyTableCell>
                <BodyTableCell>
                  {format(item.date, "MMM dd, yyyy")}
                </BodyTableCell>
                <BodyTableCell>{item.category}</BodyTableCell>
                <BodyTableCell>{item.brand}</BodyTableCell>
                <BodyTableCell>${item.price}</BodyTableCell>
                <BodyTableCell sx={{
              color: item.status === "Available" ? "success.main" : "error.main"
            }}>
                  {item.status}
                </BodyTableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </ScrollBar>
    </Card>;
};

const productList = [{
  name: "Nike Air max 170",
  image: "/static/products/shoe-1.png",
  date: new Date(),
  price: 654,
  category: "Shoes",
  status: "Available",
  brand: "Nike"
}, {
  name: "Cactus Plant",
  image: "/static/products/bonsai.png",
  date: new Date(),
  price: 654,
  category: "Tree",
  status: "Available",
  brand: "Bonsai"
}, {
  name: "Minimal Pot",
  image: "/static/products/airbud.png",
  date: new Date(),
  price: 654,
  category: "Accessories",
  status: "Out of Stock",
  brand: "Ikea"
}, {
  name: "Adidas Blaze",
  image: "/static/products/shoe-2.png",
  date: new Date(),
  price: 654,
  category: "Shoes",
  status: "Out of Stock",
  brand: "Adidas"
}];
export default PopularProducts;