import { Box, Button, Card, Grid, IconButton, Modal, styled } from "@mui/material";
import DarkTextField from "components/DarkTextField";
import FlexBox from "components/FlexBox";
import { H2, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import ImageUploadIcon from "icons/ImageUploadIcon";
import toast from "react-hot-toast";
import ScrollBar from "simplebar-react";
import axiosInstance from "utils/axios";
import * as Yup from "yup"; // component props interface

// styled components
const StyledModalCard = styled(Card)(({
  theme
}) => ({
  top: "50%",
  left: "50%",
  maxWidth: 450,
  minWidth: 200,
  position: "absolute",
  padding: "1.5rem",
  boxShadow: theme.shadows[2],
  transform: "translate(-50%, -50%)",
  width: "100%",
  [theme.breakpoints.down(325)]: {
    maxWidth: "100%"
  }
}));

const AddEmployeeModal = ({
  open,
  onClose,
  edit,
  data
}) => {
  const initialValues = {
    name: data?.name || "",
    username: data?.username || "",
    email: data?.email || "",
    avatar: data?.avatar || "",
    position: data?.role || "",
    experience: data?.experience || 1,
    team: data?.team || 1,
    phone: data?.phone || "",
    dateOfBirth: data?.dateOfBirth || "",
    address: data?.address || "",
    status: data?.status || ""
  };
  const fieldValidationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short").required("Name is Required!"),
    username: Yup.string().min(3, "Too Short").required("Username is Required!"),
    email: Yup.string().required("Email is Required!"),
    // avatar: Yup.string().required("Avatar is Required!"),
    position: Yup.string().required("Position is Required!"),
    phone: Yup.string().required("Phone is Required!"),
    address: Yup.string().required("Address is Required!"),
    dateOfBirth: Yup.string().required("Date Of Birth is Required!"),
    experience: Yup.number().required("Experience is Required!"),
    team: Yup.number().required("Team Member is Required!"),
    status: Yup.string().required("Status is Required!")
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
      axiosInstance.post("/api/tableData2/new", {
        name: values.name,
        username: values.username,
        email: values.email,
        position: values.position,
        experience: values.experience,
        team: values.team,
        phone: values.phone,
        dateOfBirth: values.dateOfBirth,
        address: values.address,
        status: values.status
      }).then(() => {
        onClose();
        toast.success("New Data Added Successfully");
      }).catch(error => console.log(error));
    }
  });
  return <Modal open={open} onClose={onClose}>
      <StyledModalCard>
        <H2 mb={2}>{edit ? "Edit Employee" : "Add new Employee"}</H2>
        <form onSubmit={handleSubmit}>
          <ScrollBar style={{
          maxHeight: 400
        }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <H6 mb={1}>Name</H6>
                <DarkTextField name="name" placeholder="Name" onChange={handleChange} value={values.name} error={Boolean(errors.name && touched.name)} helperText={touched.name && errors.name} />
              </Grid>

              <Grid item xs={6}>
                <H6 mb={1}>Username</H6>
                <DarkTextField name="username" placeholder="Username" onChange={handleChange} value={values.username} error={Boolean(errors.username && touched.username)} helperText={touched.username && errors.username} />
              </Grid>

              <Grid item xs={6}>
                <H6 mb={1}>Email</H6>
                <DarkTextField name="email" placeholder="uilib@gmail.com" onChange={handleChange} value={values.email} error={Boolean(errors.email && touched.email)} helperText={touched.email && errors.email} />
              </Grid>

              <Grid item xs={6}>
                <H6 mb={1}>Date of Birth</H6>
                <DarkTextField name="dateOfBirth" placeholder="yyyy/mm/day" onChange={handleChange} value={values.dateOfBirth} error={Boolean(errors.dateOfBirth && touched.dateOfBirth)} helperText={touched.dateOfBirth && errors.dateOfBirth} />
              </Grid>

              <Grid item xs={6}>
                <H6 mb={1}>Phone</H6>
                <DarkTextField name="phone" placeholder="Phone" onChange={handleChange} value={values.phone} error={Boolean(errors.phone && touched.phone)} helperText={touched.phone && errors.phone} />
              </Grid>

              <Grid item xs={6}>
                <H6 mb={1}>Address</H6>
                <DarkTextField name="address" placeholder="Address" onChange={handleChange} value={values.address} error={Boolean(errors.address && touched.address)} helperText={touched.address && errors.address} />
              </Grid>

              <Grid item xs={6}>
                <H6 mb={1}>Position</H6>
                <DarkTextField name="position" placeholder="developer" onChange={handleChange} value={values.position} error={Boolean(errors.position && touched.position)} helperText={touched.position && errors.position} />
              </Grid>

              <Grid item xs={6}>
                <H6 mb={1}>Experience</H6>
                <DarkTextField name="experience" type="number" placeholder="Experience" onChange={handleChange} value={values.experience} error={Boolean(errors.experience && touched.experience)} helperText={touched.experience && errors.experience} />
              </Grid>

              <Grid item xs={6}>
                <H6 mb={1}>Team</H6>
                <DarkTextField name="team" type="number" placeholder="Team Member" onChange={handleChange} value={values.team} error={Boolean(errors.team && touched.team)} helperText={touched.team && errors.team} />
              </Grid>

              <Grid item xs={6}>
                <H6 mb={1}>Status</H6>
                <DarkTextField name="status" placeholder="Full Time" onChange={handleChange} value={values.status} error={Boolean(errors.status && touched.status)} helperText={touched.status && errors.status} />
              </Grid>

              <Grid item xs={12}>
                <H6 mb={1}>Add Picture</H6>

                <label htmlFor="icon-button-file">
                  <input type="file" accept="image/*" id="icon-button-file" style={{
                  display: "none"
                }} />
                  <IconButton disableRipple component="span" sx={{
                  padding: 0,
                  display: "block"
                }}>
                    <Box sx={{
                    minHeight: 40,
                    display: "flex",
                    borderRadius: "8px",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "divider"
                  }}>
                      <ImageUploadIcon sx={{
                      fontSize: 18,
                      marginRight: 0.5,
                      color: "text.disabled"
                    }} />
                      <Small color="text.disabled">Choose a file</Small>
                    </Box>
                  </IconButton>
                </label>
              </Grid>
            </Grid>
          </ScrollBar>

          <FlexBox justifyContent="flex-end" marginTop={4}>
            <Button fullWidth size="small" variant="outlined" onClick={onClose} sx={{
            width: 124,
            fontSize: 12,
            marginRight: 2,
            color: "text.disabled",
            borderColor: "text.disabled"
          }}>
              Cancel
            </Button>
            <Button fullWidth size="small" type="submit" variant="contained" sx={{
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

export default AddEmployeeModal;