import { ChevronRight } from "@mui/icons-material";
import { Box, Button, Grid, styled, useTheme } from "@mui/material";
import FlexBox from "components/FlexBox";
import { H1, Small } from "components/Typography";
import { Title } from "./Screens"; // styled components

const MainContainer = styled(Box)(({
  theme
}) => ({
  maxWidth: 1000,
  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    padding: "0 1rem"
  }
}));

const Dashboards = () => {
  const theme = useTheme();
  const lightTheme = theme.palette.mode === "light";
  return <MainContainer data-aos="fade-up">
      <Grid container spacing={4}>
        <Grid item sm={6} xs={12}>
          <H1 fontSize={40} fontWeight={800} color="#FF6B93">
            7+
          </H1>
          <Title>Clean Dashboard Designs</Title>

          <Small mt={2} fontSize={14} fontWeight={600} color="text.disabled" display="inline-block">
            Uko comes with 8 different modern clean dashboard Look
          </Small>

          <FlexBox justifyContent="space-between" flexWrap="wrap" maxWidth={230} mt={3}>
            {[1, 2, 3, 4].map(item => <Button key={item} size="small" variant="outlined" endIcon={<ChevronRight />} sx={{
            mb: 2
          }}>
                Saas
              </Button>)}
          </FlexBox>
        </Grid>
        <Grid item sm={6} xs={12}>
          {lightTheme ? <img src="/static/landing-page/clean-dashboard.png" width="100%" alt="" /> : <img src="/static/landing-page/clean-dashboard-dark.png" width="100%" alt="" />}
        </Grid>
      </Grid>
    </MainContainer>;
};

export default Dashboards;