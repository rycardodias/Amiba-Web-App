import { Box, Button, styled, useTheme } from "@mui/material";
import { Small, Span } from "components/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "./Screens"; // styled components

const Wrapper = styled(Box)(({
  theme
}) => ({
  backgroundImage: theme.palette.mode === "light" ? "url('/static/landing-page/section-bg.svg')" : "url('/static/landing-page/section-bg-dark.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  textAlign: "center",
  padding: "3rem 4rem",
  [theme.breakpoints.down("sm")]: {
    padding: "1rem"
  }
}));

const Sections = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const lightTheme = theme.palette.mode === "light";
  return <Wrapper data-aos="fade-up">
      <Title color="#94A4C4">
        Beautiful Management{" "}
        <Span color={lightTheme ? "secondary.purple" : "#A798FF"}>
          Sections
        </Span>
      </Title>
      <Small mt={1} mb={3} fontSize={16} fontWeight={400} color="#94A4C4" display="inline-block">
        Integrated forms with validation, Project examples, To do list and
        search functionality!
      </Small>

      <Box textAlign="center" p={3}>
        {lightTheme ? <img src="/static/landing-page/sections.png" alt="Dashboards" width="100%" /> : <img src="/static/landing-page/sections-dark.png" alt="Dashboards" width="100%" />}
      </Box>

      <Button sx={{
      width: 150,
      fontSize: 14,
      fontWeight: 500,
      borderRadius: "4px",
      color: "common.white",
      padding: ".7rem 1rem",
      backgroundColor: "primary.main"
    }} onClick={() => navigate("/dashboard")}>
        Live Demo
      </Button>
    </Wrapper>;
};

export default Sections;