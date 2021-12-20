import { ChevronRight } from "@mui/icons-material";
import { Box, Button, Grid, styled, useTheme } from "@mui/material";
import { H1, Small, Span } from "components/Typography";
import React from "react";
import { useNavigate } from "react-router-dom"; // styled components

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
  marginLeft: 16,
  [theme.breakpoints.down(410)]: {
    marginLeft: 0,
    marginTop: 16
  }
}));
export const Title = styled(H1)(({
  theme
}) => ({
  fontSize: 36,
  fontWeight: 800,
  lineHeight: 1.3,
  [theme.breakpoints.down(450)]: {
    fontSize: 27,
    lineHeight: 1.1
  }
}));

const Screens = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const lightTheme = theme.palette.mode === "light";
  return <MainContainer data-aos="fade-up">
      <Grid container spacing={4} alignItems="center">
        <Grid item md={6} xs={12}>
          <Title>
            Uko Provides Numerous{" "}
            <Span color="primary.main">Screens & Components</Span>
          </Title>

          <Small color="text.disabled" display="block" fontWeight={600} fontSize={14} mt={1} mb={3}>
            Browse through over 100 individual components and over 50+ screens
          </Small>

          <Button size="small" variant="contained" onClick={() => navigate("/components")}>
            Browse Components
          </Button>

          <StyledButton variant="outlined" size="small" endIcon={<ChevronRight />} onClick={() => navigate("/dashboard")}>
            Live Demo
          </StyledButton>
        </Grid>

        <Grid item md={6} xs={12}>
          {lightTheme ? <img src="/static/landing-page/screens.png" width="100%" alt="" /> : <img src="/static/landing-page/screens-dark.png" width="100%" alt="" />}
        </Grid>
      </Grid>
    </MainContainer>;
};

export default Screens;