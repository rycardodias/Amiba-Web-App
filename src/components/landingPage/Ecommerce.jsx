import { ChevronRight } from "@mui/icons-material";
import { Box, Button, Grid, styled, useTheme } from "@mui/material";
import { Small, Span } from "components/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "./Screens"; // styled components

const MainContainer = styled(Box)(({
  theme
}) => ({
  maxWidth: 1000,
  margin: "auto",
  padding: "5rem 0",
  [theme.breakpoints.down("sm")]: {
    padding: "3rem 1rem"
  }
}));
const StyledButton = styled(Button)(({
  theme
}) => ({
  marginRight: 16,
  [theme.breakpoints.down(410)]: {
    marginRight: 0,
    marginTop: 16
  }
}));

const Ecommerce = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const lightTheme = theme.palette.mode === "light";
  return <MainContainer data-aos="fade-up">
      <Grid container spacing={4} alignItems="center">
        <Grid item md={6} xs={12}>
          {lightTheme ? <img src="/static/landing-page/ecommerce.png" width="100%" alt="" /> : <img src="/static/landing-page/ecommerce-dark.png" width="100%" alt="" />}
        </Grid>

        <Grid item md={6} xs={12} textAlign="right">
          <Title>
            <Span color="#FF9777">E-commerce</Span> with Minimal Apps
          </Title>

          <Small color="text.disabled" display="block" fontWeight={600} fontSize={14} mt={1} mb={3}>
            E-commerce pages with product details and edit
          </Small>

          <StyledButton variant="outlined" size="small" endIcon={<ChevronRight />} onClick={() => navigate("/dashboard")}>
            Live Demo
          </StyledButton>

          <Button size="small" variant="contained">
            Browse Apps
          </Button>
        </Grid>
      </Grid>
    </MainContainer>;
};

export default Ecommerce;