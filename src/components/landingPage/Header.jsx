import { Brightness4, Menu } from "@mui/icons-material";
import { Box, Container, Drawer, IconButton, styled, useMediaQuery } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { SettingsContext } from "contexts/SettingsContext";
import ThemeIcon from "icons/ThemeIcon";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { THEMES } from "../../constants"; // styled components

const MenuList = styled("ul")(({
  theme
}) => ({
  margin: 0,
  padding: 0,
  listStyle: "none",
  [theme.breakpoints.down("sm")]: {
    "& a": {
      display: "block",
      marginTop: "1rem"
    }
  }
}));
const MenuListItem = styled(Link)(({
  theme
}) => ({
  display: "inline-block",
  margin: "0 1rem",
  fontSize: 12,
  color: theme.palette.text.disabled,
  fontWeight: 500,
  cursor: "pointer",
  "&:last-of-type": {
    padding: ".4rem 1rem",
    borderRadius: "6px",
    border: "1px solid",
    borderColor: theme.palette.divider
  },
  "&:hover": {
    color: theme.palette.primary.main
  }
}));

const Header = () => {
  // const theme = useTheme();
  const [open, setOpen] = useState(false);
  const downMd = useMediaQuery(theme => theme.breakpoints.down("sm"));
  const {
    settings,
    saveSettings
  } = useContext(SettingsContext);

  const handleChangeTheme = theme => {
    saveSettings({ ...settings,
      theme
    });
  };

  const Menus = () => {
    return <MenuList>
        {settings.theme === "light" ? <IconButton disableRipple onClick={() => handleChangeTheme(THEMES.DARK)}>
            <ThemeIcon />
          </IconButton> : <IconButton disableRipple onClick={() => handleChangeTheme(THEMES.LIGHT)}>
            <Brightness4 />
          </IconButton>}
        <MenuListItem to="/">Home</MenuListItem>
        <MenuListItem to="#">Purchase Now</MenuListItem>
      </MenuList>;
  };

  return <AppBar position="fixed" sx={{
    boxShadow: 2,
    minHeight: 64,
    justifyContent: "center",
    backgroundColor: "background.default"
  }}>
      <Container>
        <Toolbar sx={{
        justifyContent: "space-between",
        pl: 0,
        pr: 0
      }}>
          <Link to="/">
            <img src="/static/logo/logo.svg" width={30} alt="Logo" />
          </Link>
          {downMd ? <Box>
              <IconButton onClick={() => setOpen(true)}>
                <Menu />
              </IconButton>
              <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <Menus />
              </Drawer>
            </Box> : <Menus />}
        </Toolbar>
      </Container>
    </AppBar>;
};

export default Header;