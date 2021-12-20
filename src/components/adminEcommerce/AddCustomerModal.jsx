import { CameraAlt, KeyboardArrowDown } from "@mui/icons-material";
import { Badge, Box, Button, Card, Grid, IconButton, InputBase, MenuItem, Modal, Select, styled } from "@mui/material";
import DarkTextField from "components/DarkTextField";
import FlexBox from "components/FlexBox";
import { H2, H6 } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import { useFormik } from "formik";
import * as Yup from "yup"; // component props interface

// styled components
const StyledModalCard = styled(Card)(({
  theme
}) => ({
  top: "50%",
  left: "50%",
  maxWidth: 700,
  minWidth: 300,
  position: "absolute",
  padding: "1.5rem",
  boxShadow: theme.shadows[2],
  transform: "translate(-50%, -50%)",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    "& .main-form": {
      height: 200,
      overflow: "auto"
    }
  }
}));
const StyledBadge = styled(Badge)(({
  theme
}) => ({
  "& .MuiBadge-badge": {
    width: 25,
    height: 25,
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
  }
}));
const StyledMenuItem = styled(MenuItem)(({
  theme
}) => ({
  fontSize: 12,
  fontWeight: 500,
  color: theme.palette.text.disabled
}));
const StyledSelect = styled(Select)(({
  theme
}) => ({
  height: 35,
  fontSize: 12,
  padding: "0 1rem",
  borderRadius: "8px",
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.mode === "light" ? theme.palette.secondary[300] : theme.palette.divider,
  "& .MuiSvgIcon-root": {
    color: theme.palette.text.disabled
  }
}));

const AddCustomerModal = ({
  open,
  onClose,
  edit,
  data
}) => {
  const initialValues = {
    firstName: data?.name.split(" ")[0] || "",
    lastName: data?.name.split(" ")[1] || "",
    email: data?.email || "",
    location: data?.location || "",
    phone: data?.phone || "",
    city: "",
    country: "",
    state: "",
    status: data?.status.toLowerCase() || "active"
  };
  const fieldValidationSchema = Yup.object().shape({
    firstName: Yup.string().min(3, "Too Short").required("First Name is Required!"),
    lastName: Yup.string().required("Last Name is Required!"),
    email: Yup.string().required("Email is Required!"),
    location: Yup.string().required("Location is Required!"),
    phone: Yup.string().min(11, "Too short").required("Phone is Required!"),
    country: Yup.string().min(3, "Too short").required("Country is Required!"),
    city: Yup.string().min(3, "Too short").required("City is Required!"),
    state: Yup.string().min(3, "Too short").required("State is Required!")
  });
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched
  } = useFormik({
    initialValues,
    validationSchema: fieldValidationSchema,
    onSubmit: values => {
      console.log(values);
    }
  });
  return <Modal open={open} onClose={onClose}>
      <StyledModalCard>
        <H2>{edit ? "Edit Product" : "Add new Customer"}</H2>

        <Box textAlign="center" py={3}>
          <StyledBadge overlap="circular" anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }} badgeContent={<label htmlFor="icon-button-file">
                <input type="file" accept="image/*" id="icon-button-file" style={{
            display: "none"
          }} />

                <IconButton aria-label="upload picture" component="span">
                  <CameraAlt sx={{
              fontSize: 16,
              color: "background.paper"
            }} />
                </IconButton>
              </label>}>
            <UkoAvatar sx={{
            width: 100,
            height: 100
          }} alt="Travis Howard" src={data && edit ? data.avatar : "/static/user/profile-picture.png"} />
          </StyledBadge>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} className="main-form">
            <Grid item sm={6} xs={12}>
              <H6 mb={1}>First Name</H6>
              <DarkTextField placeholder="John" name="firstName" onChange={handleChange} value={values.firstName} error={Boolean(errors.firstName && touched.firstName)} helperText={touched.firstName && errors.firstName} />
            </Grid>

            <Grid item sm={6} xs={12}>
              <H6 mb={1}>Last Name</H6>
              <DarkTextField placeholder="Smith" name="lastName" onChange={handleChange} value={values.lastName} error={Boolean(errors.lastName && touched.lastName)} helperText={touched.lastName && errors.lastName} />
            </Grid>
            <Grid item sm={6} xs={12}>
              <H6 mb={1}>Email</H6>
              <DarkTextField placeholder="uilib@gmail.com" name="email" onChange={handleChange} value={values.email} error={Boolean(errors.email && touched.email)} helperText={touched.email && errors.email} />
            </Grid>

            <Grid item sm={6} xs={12}>
              <H6 mb={1}>Location</H6>
              <DarkTextField placeholder="Corner View" name="location" onChange={handleChange} value={values.location} error={Boolean(errors.location && touched.location)} helperText={touched.location && errors.location} />
            </Grid>

            <Grid item sm={6} xs={12}>
              <H6 mb={1}>Phone</H6>
              <DarkTextField placeholder="+0188000000" name="phone" onChange={handleChange} value={values.phone} error={Boolean(errors.phone && touched.phone)} helperText={touched.phone && errors.phone} />
            </Grid>

            <Grid item sm={6} xs={12}>
              <H6 mb={1}>City</H6>
              <DarkTextField placeholder="Sylhet" name="city" onChange={handleChange} value={values.city} error={Boolean(errors.city && touched.city)} helperText={touched.city && errors.city} />
            </Grid>

            <Grid item sm={6} xs={12}>
              <H6 mb={1}>Country</H6>
              <DarkTextField placeholder="Bangladesh" name="country" onChange={handleChange} value={values.country} error={Boolean(errors.country && touched.country)} helperText={touched.country && errors.country} />
            </Grid>

            <Grid item sm={6} xs={12}>
              <H6 mb={1}>State/Region</H6>
              <DarkTextField placeholder="Asia" name="state" onChange={handleChange} value={values.state} error={Boolean(errors.state && touched.state)} helperText={touched.state && errors.state} />
            </Grid>

            <Grid item xs={12}>
              <H6 mb={1}>Status</H6>
              <StyledSelect fullWidth name="status" value={values.status} onChange={handleChange} input={<InputBase placeholder="Asia" />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                <StyledMenuItem value="active">Active</StyledMenuItem>
                <StyledMenuItem value="disabled">Disabled</StyledMenuItem>
              </StyledSelect>
            </Grid>
          </Grid>

          <FlexBox justifyContent="flex-end" marginTop={2}>
            <Button fullWidth variant="outlined" onClick={onClose} sx={{
            width: 124,
            fontSize: 12,
            marginRight: 2,
            color: "text.disabled",
            borderColor: "text.disabled"
          }}>
              Cancel
            </Button>
            <Button fullWidth type="submit" variant="contained" sx={{
            width: 124,
            fontSize: 12
          }}>
              Save
            </Button>
          </FlexBox>
        </form>
      </StyledModalCard>
    </Modal>;
};

export default AddCustomerModal;