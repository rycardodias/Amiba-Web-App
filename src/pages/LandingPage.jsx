import { Container } from "@mui/material";
import Dashboards from "components/landingPage/Dashboards";
import Ecommerce from "components/landingPage/Ecommerce";
import Features from "components/landingPage/Features";
import Footer from "components/landingPage/Footer";
import GetStarted from "components/landingPage/GetStarted";
import Hero from "components/landingPage/Hero";
import Screens from "components/landingPage/Screens";
import Sections from "components/landingPage/Sections";

const LandingPage = () => {
  return <>
      <Hero />

      <Container>
        <Features />
        <Dashboards />
        <Screens />
        <Ecommerce />
        <Sections />
        <GetStarted />
        <Footer />
      </Container>
    </>;
};

export default LandingPage;