import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { Box, styled } from "@mui/material";
import { H6 } from "components/Typography";
import React from "react";
import { NavLink } from "react-router-dom"; // styled components

const StyledNavLink = styled(NavLink)(({
  theme
}) => ({
  padding: 10,
  display: "inline-flex",
  borderRadius: "50%",
  "&:hover": {
    background: theme.palette.grey[100]
  }
}));

const Footer = () => {
  return <Box py={8} textAlign="center">
      <H6>
        Developed with 💗 & Care by <a href="https://ui-lib.com/">UI Lib</a>
      </H6>

      <Box mt={1}>
        <StyledNavLink to="#">
          <Facebook color="primary" sx={{
          fontSize: 22
        }} />
        </StyledNavLink>

        <StyledNavLink to="#">
          <Twitter color="primary" />
        </StyledNavLink>

        <StyledNavLink to="#">
          <YouTube color="primary" />
        </StyledNavLink>

        <StyledNavLink to="#">
          <Instagram color="primary" sx={{
          fontSize: 22
        }} />
        </StyledNavLink>
      </Box>
    </Box>;
};

export default Footer;