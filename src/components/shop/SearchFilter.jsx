import { ShoppingCart } from "@mui/icons-material";
import { Box, Button, Card, Slider, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import { H6, Small, Tiny } from "components/Typography";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // styled components
import { getOrganizationsProductAvailable } from 'lib/requests/organizationsRequests'
// import { set } from "date-fns/esm";
import { productTypes } from "lib/values/types";

const Dot = styled(Box)(({ theme, active }) => ({
  width: 8, height: 8, borderRadius: "50%", marginRight: 8, backgroundColor: active ? theme.palette.primary.main : theme.palette.text.secondary
}));
const CountWrapper = styled(Box)(({ theme }) => ({
  width: 33, height: 18, display: "flex", alignItems: "center", borderRadius: "10px", justifyContent: "center",
  color: theme.palette.text.disabled, backgroundColor: theme.palette.mode === "light" ? theme.palette.secondary[300] : theme.palette.divider
}));

const SearchFilter = (props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState([100, 1000]);

  const handleChange = (e, value) => {
    setValue(value);
  };

  const [organizationsList, setorganizationsList] = useState([])

  useEffect(() => {
    getOrganizationsProductAvailable()
      .then(response => {
        if (response.data.error) return
        setorganizationsList(response.data.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return <Card sx={{ padding: 2 }}>
    <Box>
      <H6>{t("Organization")}</H6>

      {organizationsList && organizationsList.map(item =>
        <FlexBox key={item.id} alignItems="center" justifyContent="space-between" marginTop={2}
          onClick={() => props.onFilterChange("ORG", props.organization === item.id ? "" : item.id)}
          sx={{ cursor: "pointer", color: props.organization === item.name ? "primary.main" : "text.disabled" }}>

          <FlexBox alignItems="center">
            <Dot active={props.organization === item.id} />
            <Small>{t(item.name)}</Small>
          </FlexBox>
          <CountWrapper>
            <Small>{item.totalProducts}</Small>
          </CountWrapper>
        </FlexBox>
      )}
    </Box>

    <Box marginTop={4}>
      <H6>{t("Categories")}</H6>
      {productTypes.map(item =>
        <FlexBox key={item.id} value={item.id} alignItems="center" marginTop={2}
          onClick={() => props.onFilterChange("CATEGORY", props.category === item.id ? "" : item.id)}
          sx={{ cursor: "pointer", color: props.category === item ? "primary.main" : "text.disabled" }}>

          <Dot active={props.category === item.id} />
          <Small value={item.id}>{t(item.name)}</Small>

        </FlexBox>
      )}
    </Box>

    {/* <Box marginTop={4}>
      <H6>{t("Sort By")}</H6>
      {sortBy.map(item =>
        <FlexBox key={item.id} alignItems="center" marginTop={2}
          onClick={() => props.onFilterChange("SORTBY", item.id)}
          sx={{ cursor: "pointer", color: props.sortBy === item.id ? "primary.main" : "text.disabled" }}>
          <Dot active={props.sortBy === item.id} />
          <Small>{t(item.name)}</Small>
        </FlexBox>)}
    </Box>

    <Box marginTop={4}>
      <H6 mb={1}>{t("Price Range")}</H6>
      <Slider disableSwap color="primary" value={value} valueLabelFormat={value => `$${value}`} onChange={handleChange} valueLabelDisplay="auto" min={100} max={1000} sx={{
        "& .MuiSlider-thumb": { width: 13, height: 13 },
        "& .MuiSlider-thumbColorPrimary:hover": { boxShadow: "0px 0px 0px 5px rgb(97 169 255 / 16%)" },
        "& .MuiSlider-thumbColorPrimary.Mui-focusVisible": { boxShadow: "0px 0px 0px 5px rgb(97 169 255 / 16%)" },
        ".MuiSlider-colorPrimary .MuiSlider-valueLabelLabel": { color: "background.paper" },
        "& .MuiSlider-thumbColorPrimary .MuiSlider-valueLabel": { backgroundColor: "primary.main" }
      }} />
      <FlexBox alignItems="center" justifyContent="space-between">
        <Tiny fontWeight={500} color="text.disabled">
          Min
        </Tiny>
        <Tiny fontWeight={500} color="text.disabled">
          Max
        </Tiny>
      </FlexBox>
    </Box> */}

    <Button variant="contained" fullWidth sx={{ marginTop: 4 }}>
      {t("View Cart")}
      <ShoppingCart sx={{ fontSize: 17, marginLeft: 1 }} />
    </Button>
  </Card>;
};


const sortBy = [
  {
    id: "NEW",
    name: "Newest"
  }, {
    id: "POP",
    name: "Popular"
  },
  // "Default", "Price: high to low", "Price: low to high"
];
export default SearchFilter;