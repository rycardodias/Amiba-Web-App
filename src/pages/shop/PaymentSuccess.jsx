import { Box, Button, Card } from "@mui/material";
import { H2, Small } from "components/Typography";
import useTitle from "hooks/useTitle";
import OvalCheckedIcon from "icons/OvalCheckedIcon";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  useTitle(t("Payment Success"));
  return <Card sx={{
    paddingY: 8,
    marginTop: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}>
    <Box sx={{ maxWidth: 400, textAlign: "center" }}>
      <OvalCheckedIcon sx={{
        fontSize: 100,
        marginBottom: 2,
        color: "primary.main"
      }} />
      <H2>{t("Success")}</H2>
      <Small marginTop={1} display="block" marginBottom={5} color="text.disabled">
        {t("Will be sent an email with payment details")}
      </Small>
      <Button variant="contained" fullWidth onClick={() => navigate("/")}>
        {t("Back to Shop")}
      </Button>
    </Box>
  </Card>;
};

export default PaymentSuccess;