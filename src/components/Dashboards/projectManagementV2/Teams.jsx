import { AvatarGroup, Box, Grid } from "@mui/material";
import AddIconButton from "components/AddIconButton";
import { H5, H6 } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import { useTranslation } from "react-i18next";

const Teams = () => {
  const {
    t
  } = useTranslation();
  return <Box pt={3} pb={5} px={3}>
      <H5 marginBottom={2}>{t("Teams")}</H5>

      <Grid container spacing={3}>
        {["Discord Nitro", "Github", "Stack Over"].map(item => <Grid item xs={12} sm={6} key={item}>
            <H6>{item}</H6>

            <AvatarGroup sx={{
          marginTop: 1,
          justifyContent: "flex-end"
        }}>
              <UkoAvatar alt="Remy Sharp" src="/static/avatar/001-man.svg" />
              <UkoAvatar alt="Travis" src="/static/avatar/002-girl.svg" />
              <UkoAvatar alt="Cindy Baker" src="/static/avatar/003-boy.svg" />
              <UkoAvatar alt="Cindy Baker" src="/static/avatar/005-man-1.svg" />
            </AvatarGroup>
          </Grid>)}

        <Grid item xs={12} sm={6}>
          <H6>Create a new team</H6>
          <AddIconButton sx={{
          mt: 1,
          p: 0
        }} />
        </Grid>
      </Grid>
    </Box>;
};

export default Teams;