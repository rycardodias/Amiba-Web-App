import { Add } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

const AddIconButton = props => {
  return <IconButton sx={{
    p: 0
  }} {...props}>
      <Box sx={{
      width: 36,
      height: 36,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px dashed",
      borderRadius: "50%",
      borderColor: "secondary.400"
    }}>
        <Add fontSize="small" sx={{
        color: "secondary.400"
      }} />
      </Box>
    </IconButton>;
};

export default AddIconButton;