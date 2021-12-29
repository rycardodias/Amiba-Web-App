import { Card, styled, Select, MenuItem } from "@mui/material";

const StyledModalCard = styled(Card)(({ theme }) => ({
    top: "50%", left: "50%", maxWidth: 450, minWidth: 200, position: "absolute", padding: "1.5rem",
    boxShadow: theme.shadows[2], transform: "translate(-50%, -50%)", width: "100%",
    [theme.breakpoints.down(325)]: { maxWidth: "100%" }
}));
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    fontSize: 12, fontWeight: 500, color: theme.palette.text.disabled
}));
const StyledSelect = styled(Select)(({ theme }) => ({
    height: 35, fontSize: 12, padding: "0 1rem", borderRadius: "8px", color: theme.palette.text.primary,
    backgroundColor: theme.palette.mode === "light" ? theme.palette.secondary[300] : theme.palette.divider,
    "& .MuiSvgIcon-root": { color: theme.palette.text.disabled }
}));

export { StyledModalCard, StyledMenuItem, StyledSelect }