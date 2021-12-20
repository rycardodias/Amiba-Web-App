import { styled, TextField } from "@mui/material";
const StyledDarkTextField = styled(TextField)(({
  theme
}) => ({
  "&:hover, & .MuiOutlinedInput-root:hover": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main
    }
  },
  "& .MuiOutlinedInput-input": {
    fontSize: 12,
    minHeight: 35,
    fontWeight: 500,
    borderRadius: "8px",
    padding: "0px 1rem",
    color: theme.palette.text.primary
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "8px",
    borderColor: "transparent",
    borderWidth: "1px !important"
  },
  "& .MuiInputBase-root": {
    backgroundColor: theme.palette.mode === "light" ? theme.palette.text.secondary : theme.palette.divider
  }
}));

const DarkTextField = props => {
  return <StyledDarkTextField {...props} fullWidth />;
};

export default DarkTextField;