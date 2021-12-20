import { Box, ButtonBase, Grid, styled } from "@mui/material";
import { Title } from "./Screens"; // styled components

const MainContainer = styled(Box)(({
  theme
}) => ({
  backgroundImage: "linear-gradient(180deg, #61A9FF 22.71%, #428AE1 93.69%)",
  borderRadius: "8px",
  marginTop: "10rem",
  [theme.breakpoints.down("md")]: {
    padding: "1rem 2rem",
    marginTop: "5rem"
  }
}));

const GetStarted = () => {
  return <MainContainer>
      <Grid container spacing={4} alignItems="center">
        <Grid item md={6} xs={12}>
          <Box textAlign="center">
            <img src="/static/landing-page/get-started.png" width="220" alt="" />
          </Box>
        </Grid>

        <Grid item md={6} xs={12}>
          <Title color="common.white">
            Get Started With Uko Dashboard today
          </Title>

          <ButtonBase sx={{
          backgroundColor: "common.white",
          color: "primary.main",
          fontSize: 14,
          fontWeight: 500,
          padding: ".7rem 1rem",
          borderRadius: "4px",
          width: 150,
          boxShadow: 1,
          mt: 3
        }}>
            Purchase Now
          </ButtonBase>
        </Grid>
      </Grid>
    </MainContainer>;
};

export default GetStarted;