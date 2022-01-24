import { Box, Button, Card, Grid, styled, useTheme } from "@mui/material";
import Password from "components/accountSettings/Password";
import UserInfo from "components/accountSettings/UserInfo";
import FlexBox from "components/FlexBox";
import { H3 } from "components/Typography";
import useTitle from "hooks/useTitle";
import PasswordIcon from "icons/PasswordIcon";
import ProfileIcon from "icons/ProfileIcon";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import convertToSlug from "utils/convertSlug"; // styled component

const StyledButton = styled(Button)(() => ({
  fontSize: 12,
  borderRadius: 0,
  marginTop: "0.4rem",
  position: "relative",
  justifyContent: "flex-start"
}));

const AccountSettings = () => {
  const { t } = useTranslation();
  // change navbar title
  useTitle(t("Account Settings"));
  const theme = useTheme();

  const [active, setActive] = useState("user-info");
  const style = {
    backgroundColor: theme.palette.mode === "light" ? theme.palette.secondary.light : theme.palette.divider, color: theme.palette.primary.main,
    "&::before": { width: 4, right: 0, content: '""', height: "100%", position: "absolute", backgroundColor: theme.palette.primary.main }
  };
  return <Box pt={2} pb={4}>
    <Grid container spacing={3}>
      <Grid item md={3} xs={12}>
        <Card sx={{ padding: "1.5rem 0" }}>
          <H3 mb="0.5rem" pl="1.5rem">
            {t("User Profile")}
          </H3>

          <FlexBox flexDirection="column" sx={{
            [theme.breakpoints.between("sm", 960)]: { flexWrap: "wrap", flexDirection: "row", justifyContent: "space-between" }
          }}>
            {tabList.map(({ id, name, Icon }) => <StyledButton key={id} startIcon={<Icon sx={{
              color: "text.disabled"
            }} />} onClick={() => setActive(convertToSlug(name))} sx={active === convertToSlug(name) ? style : { "&:hover": style }}>
              {t(name)}
            </StyledButton>)}
          </FlexBox>
        </Card>
      </Grid>

      <Grid item md={9} xs={12}>
        {/* {active === convertToSlug(tabList[0].name) && <UserInfo />} */}
        {active === convertToSlug(tabList[0].name) && <Password />}
      </Grid>
    </Grid>
  </Box>;
};

const tabList = [
  // {
  //   id: 1,
  //   name: "User Info",
  //   Icon: ProfileIcon
  // },
  {
    id: 2,
    name: "Password",
    Icon: PasswordIcon
  }];
export default AccountSettings;