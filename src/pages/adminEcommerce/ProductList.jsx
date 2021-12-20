import { Add } from "@mui/icons-material";
import { Box, Button, styled } from "@mui/material";
import ProductColumnShape from "components/adminEcommerce/columnShapes/ProductColumnShape";
import CreateProductModal from "components/adminEcommerce/CreateProductModal";
import CustomTable from "components/adminEcommerce/CustomTable";
import { productsFakeData } from "components/adminEcommerce/fakeData";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useTranslation } from "react-i18next";
export const HeadingWrapper = styled(FlexBox)(({
  theme
}) => ({
  marginBottom: 20,
  flexWrap: "wrap",
  [theme.breakpoints.down(530)]: {
    "& .MuiButton-root": {
      width: "100%"
    },
    "& .MuiInputBase-root": {
      maxWidth: "100%",
      marginBottom: 15
    }
  }
}));

const ProductList = () => {
  // change navbar title
  useTitle("Product List");
  const {
    t
  } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  return <Box pt={2} pb={4}>
      <HeadingWrapper justifyContent="space-between" alignItems="center">
        <SearchInput placeholder="Find Products" />
        <Button variant="contained" endIcon={<Add />} onClick={() => setOpenModal(true)}>
          {t("Add Products")}
        </Button>
      </HeadingWrapper>

      <CustomTable columnShape={ProductColumnShape} data={productsFakeData} />

      <CreateProductModal open={openModal} onClose={() => setOpenModal(false)} />
    </Box>;
};

export default ProductList;