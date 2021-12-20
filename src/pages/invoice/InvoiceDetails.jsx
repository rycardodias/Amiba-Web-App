import { Box, Button, Card, Divider, Grid, IconButton } from "@mui/material";
import FlexBox from "components/FlexBox";
import { H3, H4, H6, Span, Tiny } from "components/Typography";
import useTitle from "hooks/useTitle";
import PencilIcon from "icons/PencilIcon";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const InvoiceDetails = () => {
  // change navbar title
  useTitle("Invoice Details");
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  return <Box pt={2} pb={4}>
      <Card sx={{
      padding: 4
    }}>
        <FlexBox alignItems="center" justifyContent="space-between">
          <H3>{t("Invoice Info")}</H3>
          <IconButton sx={{
          border: "1px solid",
          borderRadius: "10px",
          borderColor: "primary.main"
        }}>
            <PencilIcon sx={{
            fontSize: 16,
            color: "primary.main"
          }} />
          </IconButton>
        </FlexBox>

        <Grid container spacing={3} mt={0}>
          <Grid item md={4} xs={6}>
            <H4>{t("Order Number")}</H4>
            <H6 fontWeight={500}>#46876458</H6>
          </Grid>

          <Grid item md={4} xs={6}>
            <H4>{t("Order Date")}</H4>
            <H6 fontWeight={500}>02.12.2021</H6>
          </Grid>
        </Grid>

        <Divider sx={{
        my: 3
      }} />

        <Grid container spacing={3}>
          <Grid item md={4} xs={6}>
            <H4 fontWeight={600} mb={1.5}>
              {t("Bill To")}
            </H4>
            <H4 fontWeight={600}>Tom Hanks</H4>
            <H6 fontWeight={500}>Arizona, USA</H6>
            <H6 fontWeight={500}>+003344422</H6>
          </Grid>

          <Grid item md={4} xs={6}>
            <H4 fontWeight={600} mb={1.5}>
              {t("Bill from")}
            </H4>
            <H4 fontWeight={600}>UI lib</H4>
            <H6 fontWeight={500}>Sylhet zindabazar</H6>
            <H6 fontWeight={500}>+013145813</H6>
          </Grid>
        </Grid>

        <Divider sx={{
        my: 3
      }} />

        <Grid container spacing={3}>
          <Grid item md={4} xs={6}>
            <H4 fontWeight={600} mb={1.5}>
              {t("Client")}
            </H4>
            <FlexBox alignItems="center">
              <Box sx={{
              width: 40,
              height: 40,
              marginRight: 1,
              overflow: "hidden",
              borderRadius: "50%",
              backgroundColor: "primary.100"
            }}>
                <img src="/static/avatar/001-man.svg" alt="" />
              </Box>
              <Box>
                <H6>Tom Hanks</H6>
                <Tiny fontWeight={500} color="text.disabled">
                  UI Designer
                </Tiny>
              </Box>
            </FlexBox>
          </Grid>

          <Grid item md={4} xs={6}>
            <H4 fontWeight={600} mb={1.5}>
              {t("Item Name")}
            </H4>
            <H6 fontWeight={500}>UI Lib Uko</H6>
          </Grid>

          <Grid item md={2} xs={6}>
            <H4 fontWeight={600} mb={1.5}>
              {t("Price")}
            </H4>
            <H6 fontWeight={500}>$450</H6>
          </Grid>

          <Grid item md={2} xs={6}>
            <H4 fontWeight={600} mb={1.5}>
              {t("Quantity")}
            </H4>
            <H6 fontWeight={500}>2</H6>
          </Grid>
        </Grid>

        <Divider sx={{
        my: 3
      }} />

        <Box maxWidth={320}>
          <H4 fontWeight={600}>{t("Amount")}</H4>

          <FlexBox alignItems="center" justifyContent="space-between" my={1}>
            <H6 fontWeight={500}>Subtotal</H6>
            <H6 fontWeight={500}>$428.00</H6>
          </FlexBox>

          <FlexBox alignItems="center" justifyContent="space-between" my={1}>
            <H6 fontWeight={500}>
              Discount <Span color="text.disabled">(BLACKFRIDAY)</Span>
            </H6>
            <H6 fontWeight={500}>-$8.00</H6>
          </FlexBox>

          <FlexBox alignItems="center" justifyContent="space-between" my={1}>
            <H6 fontWeight={500}>VAT</H6>
            <H6 fontWeight={500}>$20.00</H6>
          </FlexBox>

          <Divider sx={{
          my: 2
        }} />

          <FlexBox alignItems="center" justifyContent="space-between" my={1}>
            <H6>Total</H6>
            <H6>$20.00</H6>
          </FlexBox>

          <FlexBox alignItems="center" justifyContent="space-between" my={1}>
            <H6>Status</H6>
            <H6>Unpaid</H6>
          </FlexBox>

          <Box marginTop={4}>
            <Button size="small" variant="contained" onClick={() => window.print()} sx={{
            fontSize: 12,
            marginRight: 1,
            fontWeight: 500
          }}>
              Print Invoice
            </Button>

            <Button variant="contained" size="small" onClick={() => navigate("/dashboard/add-invoice")} sx={{
            fontSize: 12,
            fontWeight: 500,
            backgroundColor: "secondary.red",
            "&:hover": {
              backgroundColor: "secondary.red"
            }
          }}>
              Edit
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>;
};

export default InvoiceDetails;