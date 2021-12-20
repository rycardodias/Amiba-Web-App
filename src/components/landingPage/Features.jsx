import { Avatar, Box, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import { Small, Span } from "components/Typography";
import { Title } from "./Screens"; // styled components

const MainContainer = styled(Box)(({
  theme
}) => ({
  padding: "5rem 0",
  [theme.breakpoints.down("sm")]: {
    padding: "3rem 1rem"
  }
}));
const ToolItem = styled(Box)(({
  theme
}) => ({
  width: 60,
  height: 60,
  borderRadius: "50%",
  boxShadow: theme.shadows[1]
}));
const Wrapper = styled(FlexBox)(({
  theme
}) => ({
  maxWidth: 1000,
  margin: "auto",
  backgroundColor: theme.palette.secondary[100],
  boxShadow: theme.shadows[1],
  borderRadius: "8px",
  padding: 32,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column"
  }
}));
const Divider = styled(Box)(({
  theme
}) => ({
  width: "1px",
  backgroundColor: theme.palette.secondary[300],
  margin: "0 1.5rem",
  [theme.breakpoints.down("sm")]: {
    height: 1,
    width: "100%",
    margin: "1.5rem 0"
  }
}));

const Features = () => {
  return <MainContainer data-aos="fade-up">
      <Title textAlign="center">
        Packed With <Span color="secondary.yellow">Features</Span>
      </Title>

      <FlexBox justifyContent="space-between" alignItems="center" maxWidth={400} margin="auto" my={4}>
        {[1, 2, 3, 4, 5].map(item => <ToolItem key={item}>
            <img src="/static/tools-logo/html.svg" width="100%" alt="" />
          </ToolItem>)}
      </FlexBox>

      <Wrapper>
        <Box flex={1}>
          <Avatar src="/static/landing-page/icon-1.svg" />
          <Small fontSize={14} display="block" mt={2}>
            Fully responsive layouts & pages. Layouts are designed to ensure
            that your project is ready for any type of end-user.
          </Small>
        </Box>

        <Divider />

        <Box flex={1}>
          <Avatar src="/static/landing-page/icon-2.svg" />
          <Small fontSize={14} display="block" mt={2}>
            Next.js friendly folder structure.
          </Small>
        </Box>
      </Wrapper>
    </MainContainer>;
};

export default Features;