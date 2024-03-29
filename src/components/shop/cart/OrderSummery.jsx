import { Box, Button, Card, Divider } from "@mui/material";
import FlexBox from "components/FlexBox";
import { H3, H4 } from "components/Typography";
import { useTranslation } from "react-i18next"; // component props interface
import { calcTotalPrice } from "./priceCalculations";
// import { useNavigate } from "react-router";

const OrderSummery = ({ btnText, data, btnClick }) => {
  const { t } = useTranslation();
  // const navigate = useNavigate()

  return <Card>
    <H3 paddingX={3} paddingY={2}>
      {t("Order Summary")}
    </H3>

    <Box paddingX={3}>
      <FlexBox alignItems="center" justifyContent="space-between" my={2}>
        <H4 fontWeight={600}>{t("Subtotal")}</H4>
        <H4 fontWeight={600}>{data && `${calcTotalPrice(data)}€`}</H4>
      </FlexBox>
      <FlexBox alignItems="center" justifyContent="space-between" my={2}>
        <H4 fontWeight={600}>{t("Discount")}</H4>
        <H4 fontWeight={600}>-</H4>
      </FlexBox>
      <FlexBox alignItems="center" justifyContent="space-between" my={2}>
        <H4 fontWeight={600}>{t("Shipping Cost")}</H4>
        <H4 fontWeight={600}>0.00€</H4>
      </FlexBox>
    </Box>

    <Divider />

    <Box paddingX={3}>
      <FlexBox alignItems="center" justifyContent="space-between" my={2}>
        <H3 fontWeight={600}>{t("Total")}</H3>
        <H3 fontWeight={600} color="primary.main">
          {`${calcTotalPrice(data)}€`}
        </H3>
      </FlexBox>

      <Button variant="contained" fullWidth onClick={btnClick}>
        {/* () => btnText === "Order" ? navigate("/shop/payment-success") : navigate("/shop/payment")}> */}
        {t(btnText || "Proceed to payment")}
      </Button>
    </Box>

    <Box sx={{ textAlign: "center", marginTop: 5, padding: 0 }}>
      <img src="/static/illustration/cart-page.svg" alt="" />
    </Box>
  </Card>;
};

export default OrderSummery;