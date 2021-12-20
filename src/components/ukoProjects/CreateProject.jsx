import { DatePicker } from "@mui/lab";
import { Avatar, Box, Button, Card, IconButton, Modal, Stack, useTheme } from "@mui/material";
import AddIconButton from "components/AddIconButton";
import DarkTextField from "components/DarkTextField";
import FlexBox from "components/FlexBox";
import { H6, Small } from "components/Typography";
import ImageUploadIcon from "icons/ImageUploadIcon";
import { useState } from "react";

const CreateProject = ({
  open,
  setOpen
}) => {
  const [date, setDate] = useState(new Date());
  const theme = useTheme();
  return <Modal open={open} onClose={() => setOpen(false)}>
      <Card sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      boxShadow: 1,
      p: 4
    }}>
        <Box mb={2}>
          <H6 mb={1}>Project Name</H6>
          <DarkTextField placeholder="Project name" fullWidth />
        </Box>

        <Box mb={2}>
          <H6 mb={1}>Deadline</H6>
          <DatePicker value={date} onChange={newValue => setDate(newValue)} renderInput={params => <DarkTextField fullWidth {...params} inputProps={{
          placeholder: "Deadline Date"
        }} />} />
        </Box>

        <Box mb={2}>
          <H6 mb={1}>Description</H6>
          <DarkTextField fullWidth rows={2} multiline name="description" placeholder="Description" sx={{
          "& .MuiOutlinedInput-root": {
            padding: 0,
            "& textarea": {
              paddingY: 1
            }
          }
        }} />
        </Box>

        <Box mb={2}>
          <H6 mb={1}>Add Picture</H6>

          <label htmlFor="icon-button-file">
            <input accept="image/*" id="icon-button-file" type="file" style={{
            display: "none"
          }} />
            <IconButton component="span" disableRipple sx={{
            padding: 0,
            display: "block"
          }}>
              <Box sx={{
              backgroundColor: theme.palette.mode === "light" ? "secondary.300" : "divider",
              minHeight: 40,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
                <ImageUploadIcon sx={{
                fontSize: 18,
                color: "text.disabled",
                marginRight: 0.5
              }} />
                <Small color="text.disabled">Choose a file</Small>
              </Box>
            </IconButton>
          </label>
        </Box>

        <Box my={1}>
          <Small>Team</Small>
          <Stack direction="row" spacing={1} mt={1}>
            <AddIconButton />
            <Avatar alt="Remy Sharp" src="/static/user/user-7.png" />
            <Avatar alt="Travis Howard" src="/static/user/user-6.png" />
            <Avatar alt="Cindy Baker" src="/static/user/user-5.png" />
          </Stack>
        </Box>

        <FlexBox mt={4}>
          <Button variant="contained" fullWidth>
            Create
          </Button>
          <Box width={40} />
          <Button variant="contained" fullWidth onClick={() => setOpen(false)} sx={{
          backgroundColor: theme.palette.mode === "light" ? "secondary.300" : "divider",
          color: "text.disabled",
          "&:hover": {
            backgroundColor: theme.palette.mode === "light" ? "secondary.300" : "divider",
            color: "text.disabled"
          }
        }}>
            Cancel
          </Button>
        </FlexBox>
      </Card>
    </Modal>;
};

export default CreateProject;