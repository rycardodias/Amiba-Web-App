import { Box, Container, Divider, Grid } from "@mui/material";
import Footer from "components/landingPage/Footer";
import GetStarted from "components/landingPage/GetStarted";
import Header from "components/landingPage/Header";
import ScreenItem from "components/landingPage/ScreenItem";
import { Title } from "components/landingPage/Screens";
import { H2, H4, Span } from "components/Typography";
import React from "react";

const ComponentsPage = () => {
  return <Box>
      <Header />

      <Box bgcolor="background.default" pt={12} pb={6}>
        <Container>
          <Grid container spacing={3} alignItems="center">
            <Grid item sm={6} xs={12}>
              <Title>
                Uko <Span color="primary.main">Components</Span>
              </Title>
              <H4>
                Browse through over 100 individual components and over 50
                screens
              </H4>
            </Grid>
            <Grid item sm={6} xs={12} textAlign="center">
              <img src="/static/landing-page/components-page.png" width="auto" alt="" />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container>
        <Box py={8}>
          <Grid container spacing={3}>
            <Grid item md={5}>
              <H2 fontWeight={800}>Screens & Apps</H2>
            </Grid>
            <Grid item md={7}>
              <Grid container spacing={3}>
                {screens.map(item => <Grid item md={4} key={item.id}>
                    <ScreenItem item={item} />
                  </Grid>)}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        <Box py={8}>
          <Grid container spacing={3}>
            <Grid item md={5}>
              <H2 fontWeight={800}>Lists</H2>
            </Grid>
            <Grid item md={7}>
              <Grid container spacing={3}>
                {lists.map(item => <Grid item md={4} key={item.id}>
                    <ScreenItem item={item} />
                  </Grid>)}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        <Box py={8}>
          <Grid container spacing={3}>
            <Grid item md={5}>
              <H2 fontWeight={800}>Components</H2>
            </Grid>
            <Grid item md={7}>
              <Grid container spacing={3}>
                {components.map(item => <Grid item md={4} key={item.id}>
                    <ScreenItem item={item} />
                  </Grid>)}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <GetStarted />

        <Footer />
      </Container>
    </Box>;
};

const screens = [{
  id: 1,
  title: "Dashboard",
  screen: 8,
  img: "/static/landing-page/screen/dashboard.svg"
}, {
  id: 2,
  title: "Login / Sign up",
  screen: 4,
  img: "/static/landing-page/screen/login.svg"
}, {
  id: 3,
  title: "Error 404",
  screen: 2,
  img: "/static/landing-page/screen/error.svg"
}, {
  id: 4,
  title: "Ecommerce",
  screen: 1,
  img: "/static/landing-page/screen/ecommerce.svg"
}, {
  id: 5,
  title: "Chat App",
  screen: 1,
  img: "/static/landing-page/screen/chat.svg"
}, {
  id: 6,
  title: "Projects",
  screen: 3,
  img: "/static/landing-page/screen/projects.svg"
}];
const lists = [{
  id: 1,
  screen: 1,
  title: "User List",
  img: "/static/landing-page/lists/user.svg"
}, {
  id: 2,
  screen: 3,
  title: "Create New User",
  img: "/static/landing-page/lists/new-user.svg"
}, {
  id: 3,
  screen: 1,
  title: "Product List",
  img: "/static/landing-page/lists/products.svg"
}, {
  id: 4,
  screen: 1,
  title: "Contact List",
  img: "/static/landing-page/lists/contacts.svg"
}, {
  id: 5,
  screen: 3,
  title: "Customer List Add",
  img: "/static/landing-page/lists/customers.svg"
}, {
  id: 6,
  screen: 4,
  title: "Add New Product",
  img: "/static/landing-page/lists/new-product.svg"
}];
const components = [{
  id: 1,
  screen: 1,
  title: "Buttons",
  img: "/static/landing-page/components/buttons.svg"
}, {
  id: 2,
  screen: 1,
  title: "Icons",
  img: "/static/landing-page/components/icons.svg"
}, {
  id: 3,
  screen: 1,
  title: "Avatar",
  img: "/static/landing-page/components/avatar.svg"
}];
export default ComponentsPage;