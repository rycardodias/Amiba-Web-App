import { Badge, Box, ButtonBase, Divider, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import { H6, Small, Tiny } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import useAuth from "hooks/useAuth";
import { Fragment, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PopoverLayout from "./PopoverLayout"; // styled components
import { useTranslation } from "react-i18next";

const StyledSmall = styled(Small)(({ theme }) => ({
  display: "block", padding: "5px 1rem", cursor: "pointer",
  "&:hover": { color: theme.palette.primary.main, backgroundColor: theme.palette.mode === "light" ? theme.palette.secondary.light : theme.palette.divider }
}));

const ProfilePopover = () => {
  const { t } = useTranslation();

  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleMenuItem = path => { navigate(path); setOpen(false); };

  return <Fragment>
    <ButtonBase disableRipple ref={anchorRef} onClick={() => setOpen(true)}>
      <Badge overlap="circular" variant="dot" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} sx={{
        "& .MuiBadge-badge": { width: 11, height: 11, right: "7%", borderRadius: "50%", border: "2px solid #fff", backgroundColor: "success.main" }
      }}>
        <UkoAvatar src={user?.avatar || "/static/avatar/001-man.svg"} sx={{ width: 30, height: 30, ml: 1 }} />
      </Badge>
    </ButtonBase>

    <PopoverLayout hiddenViewButton maxWidth={230} minWidth={200} popoverOpen={open} anchorRef={anchorRef} popoverClose={() => setOpen(false)} title={<FlexBox alignItems="center">
      <UkoAvatar src={user?.avatar || "/static/avatar/001-man.svg"} sx={{ width: 35, height: 35 }} />

      <Box ml={1}>
        <H6>{user?.name}</H6>
        <Tiny display="block" fontWeight={500} color="text.disabled">
          {user?.email}
        </Tiny>
      </Box>
    </FlexBox>}>
      <Box pt={1}>

        <StyledSmall onClick={() => handleMenuItem("/account/account-settings")}>
          {t("Settings")}
        </StyledSmall>

        <Divider sx={{ my: 1 }} />

        <StyledSmall onClick={() => { logout(); toast.error(t("You Logout Successfully")); }}>
          {t("Sign Out")}
        </StyledSmall>
      </Box>
    </PopoverLayout>
  </Fragment>;
};

export default ProfilePopover;