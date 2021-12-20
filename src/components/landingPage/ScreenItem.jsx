import { Box, useTheme } from "@mui/material";
import { H6, Small } from "components/Typography";
import React from "react"; // props types

const ScreenItem = ({
  item
}) => {
  const theme = useTheme();
  const lightTheme = theme.palette.mode === "light";
  return <Box sx={{
    boxShadow: 2,
    borderRadius: 1,
    overflow: "hidden",
    backgroundColor: "common.white"
  }}>
      <img src={item.img} alt="Dashboard" width="100%" />

      <Box px={2} py={1}>
        <H6 lineHeight={1} color={lightTheme ? "text.primary" : "background.paper"}>
          {item.title}
        </H6>
        <Small fontSize={12} color={lightTheme ? "text.disabled" : "background.default"}>
          {item.screen} screens
        </Small>
      </Box>
    </Box>;
};

export default ScreenItem;