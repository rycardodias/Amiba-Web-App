import { Box, ButtonBase, Container, styled, useTheme } from "@mui/material";
import { H1, H6, Small } from "components/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // styled components

const Wrapper = styled(Box)(() => ({
  backgroundImage: "url('/static/landing-page/landing-page.svg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat"
}));
const StyledContainer = styled(Container)(({
  theme
}) => ({
  marginTop: 64,
  paddingTop: 80,
  [theme.breakpoints.down("sm")]: {
    paddingTop: 60
  }
}));
const ContentWrapper = styled(Box)(({
  theme
}) => ({
  maxWidth: 700,
  margin: "auto",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    maxWidth: 380
  }
}));
const StyledButton = styled(ButtonBase)(() => ({
  width: 150,
  fontSize: 14,
  fontWeight: 500,
  borderRadius: "4px",
  padding: ".7rem 1rem"
}));

const Hero = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const lightTheme = theme.palette.mode === "light";
  return <Wrapper>
      <Header />
      <StyledContainer>
        <ContentWrapper>
          <Box>
            <img src="/static/logo/logo.svg" width={80} alt="Logo" />
            <H6 color="primary.main" fontSize={18} mt={2}>
              React & @mui
            </H6>
            <H1 fontSize={30} fontWeight={700}>
              Uko React Admin Dashboard
            </H1>
            <Small mt={1} mb={3} fontSize={16} fontWeight={400} display="inline-block" color="text.disabled">
              Unique design and clean code for your next web app. Carefully
              crafted using Material UI, with a primary focus on easy
              customization.
            </Small>
          </Box>

          <StyledButton sx={{
          backgroundColor: "primary.100",
          color: lightTheme ? "text.disabled" : "background.default"
        }}>
            Purchase Now
          </StyledButton>
          <StyledButton onClick={() => navigate("/dashboard")} sx={{
          ml: 2,
          color: "common.white",
          backgroundColor: "primary.main"
        }}>
            Live Demo
          </StyledButton>
        </ContentWrapper>

        <Box textAlign="center" width="auto" p={3} mt={10}>
          {lightTheme ? <img src="/static/landing-page/dashboards.png" width="100%" alt="Dashboards" /> : <img src="/static/landing-page/dashboards-dark.png" width="100%" alt="Dashboards" />}
        </Box>
      </StyledContainer>
    </Wrapper>;
};

export default Hero;