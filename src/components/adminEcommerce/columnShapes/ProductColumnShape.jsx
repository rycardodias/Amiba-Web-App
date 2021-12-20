import { Box, Rating, useTheme } from "@mui/material";
import EditIconButton from "components/EditIconButton";
import FlexBox from "components/FlexBox";
import { H6, Small } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import { useState } from "react";
import CreateProductModal from "../CreateProductModal";
const ProductColumnShape = [{
  Header: "Product Details",
  accessor: "productDetails",
  minWidth: 250,
  Cell: ({
    row
  }) => {
    const {
      image,
      name,
      company
    } = row.original;
    return <FlexBox alignItems="center">
          <UkoAvatar src={image} alt={name} sx={{
        width: 60,
        borderRadius: "10%"
      }} />
          <Box ml={2}>
            <H6 color="text.primary">{name}</H6>
            <Small>{company}</Small>
          </Box>
        </FlexBox>;
  }
}, {
  Header: "Category",
  accessor: "category",
  Cell: ({
    value
  }) => {
    const theme = useTheme();
    return <Small sx={{
      backgroundColor: theme.palette.mode === "light" ? "secondary.light" : "divider",
      borderRadius: 10,
      padding: ".2rem 1rem"
    }}>
          {value}
        </Small>;
  }
}, {
  Header: "Stock",
  accessor: "stock"
}, {
  Header: "SKU",
  accessor: "sku"
}, {
  Header: "Price",
  accessor: "price"
}, {
  Header: "Rate",
  accessor: "rate",
  Cell: ({
    value
  }) => <Box sx={{
    display: "flex",
    alignItems: "center"
  }}>
        <Rating name="read-only" size="small" value={5} readOnly />
        <Box ml={0.5}>({value})</Box>
      </Box>
}, {
  Header: "Action",
  accessor: "action",
  Cell: ({
    row
  }) => {
    const [openModal, setOpenModal] = useState(false);
    return <>
          <EditIconButton onClick={() => setOpenModal(true)} />

          <CreateProductModal editProduct open={openModal} data={row.original} onClose={() => setOpenModal(false)} />
        </>;
  }
}];
export default ProductColumnShape;