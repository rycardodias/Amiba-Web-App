import FlexBox from "components/FlexBox";
import { styled } from "@mui/material";

const ButtonWrapper = styled(FlexBox)(({ theme }) => ({
    [theme.breakpoints.down(500)]: {
        marginTop: 10, width: "100%", flexDirection: "column-reverse",
        "& > .MuiBox-root": { width: "100%", margin: "10px 0", alignItems: "center", flexDirection: "column" }, "& .MuiButton-root": { minWidth: "100%" }
    }
}));

export { ButtonWrapper }