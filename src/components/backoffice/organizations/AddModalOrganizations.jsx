import { Box, Button, Card, Grid, IconButton, Modal, styled, Select, InputBase, MenuItem } from "@mui/material";
import { CameraAlt, KeyboardArrowDown } from "@mui/icons-material";
import DarkTextField from "components/DarkTextField";
import FlexBox from "components/FlexBox";
import { H2, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import ImageUploadIcon from "icons/ImageUploadIcon";
import toast from "react-hot-toast";
import ScrollBar from "simplebar-react";
import * as Yup from "yup"; // component props interface
import * as organizationsRequests from 'lib/requests/organizationsRequests'
import { useTranslation } from "react-i18next";

// styled components
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

const AddModalOrganizations = ({ open, onClose, edit, data }) => {
  const { t } = useTranslation();

  const initialValues = {
    name: data?.name,
    type: data?.type,
    UserId: data?.UserId,
    address: data?.address,
    locale: data?.locale,
    zipcode: data?.zipcode,
    fiscalNumber: data?.fiscalNumber,
    telephone: data?.telephone,
    mobilePhone: data?.mobilePhone
  };

  const fieldValidationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short").required(`${t('Name')} ${t('is required!')}`),
    type: Yup.string().required(`${t('Type')} ${t('is required!')}`),

  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues, validationSchema: fieldValidationSchema,
    onSubmit: values => {
      organizationsRequests.createOrganization(values.type, values.UserId, values.name, values.address, values.locale,
        values.zipcode, values.fiscalNumber, values.telephone, values.mobilePhone)
        .then(() => {
          onClose();
          toast.success(t("New Data Added Successfully"));
        })
        .catch(error => console.log(error));
    }
  });

  return <Modal open={open} onClose={onClose}>
    <StyledModalCard>
      <H2 mb={2}>{edit ? `${t("Edit")} ${t("Organization")}` : `${t("Add new")} ${t("Organization")}`}</H2>
      <form onSubmit={handleSubmit}>
        <ScrollBar style={{ maxHeight: 400 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <H6 mb={1}>{t('Name')}</H6>
              <DarkTextField name="name" placeholder={t('Name')} onChange={handleChange} value={values.name} error={Boolean(errors.name && touched.name)} helperText={touched.name && errors.name} />
            </Grid>


            <Grid item xs={6}>
              <H6 mb={1}>{t('Type')}</H6>
              <StyledSelect fullWidth name="type" value={values.type} onChange={handleChange}
                input={<InputBase placeholder="Type" />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                <StyledMenuItem value="AMIBA">{t('Amiba')}</StyledMenuItem>
                <StyledMenuItem value="MATADOURO">{t('Matadouro')}</StyledMenuItem>
              </StyledSelect>
            </Grid>
            <Grid item xs={6}>
              <H6 mb={1}>{t('VAT Number')}</H6>
              <DarkTextField name="fiscalNumber" placeholder={t('VAT Number')} onChange={handleChange} value={values.fiscalNumber}
                error={Boolean(errors.fiscalNumber && touched.fiscalNumber)} helperText={touched.fiscalNumber && errors.fiscalNumber} />
            </Grid>

            <Grid item xs={6}>
              <H6 mb={1}>{t('Address')}</H6>
              <DarkTextField name="address" placeholder={t('Address')} onChange={handleChange} value={values.address}
                error={Boolean(errors.address && touched.address)} helperText={touched.address && errors.address} />
            </Grid>
            <Grid item xs={6}>
              <H6 mb={1}>{t('Locale')}</H6>
              <DarkTextField name="locale" placeholder={t('Locale')} onChange={handleChange} value={values.locale}
                error={Boolean(errors.locale && touched.locale)} helperText={touched.locale && errors.locale} />
            </Grid>
            <Grid item xs={6}>
              <H6 mb={1}>{t('Zip Code')}</H6>
              <DarkTextField name="zipcode" placeholder={t('Zip Code')} onChange={handleChange} value={values.zipcode}
                error={Boolean(errors.zipcode && touched.zipcode)} helperText={touched.zipcode && errors.zipcode} />
            </Grid>

            <Grid item xs={6}>
              <H6 mb={1}>{t('User')}</H6>
              <DarkTextField name="UserId" placeholder={t('User')} onChange={handleChange} value={values.UserId}
                error={Boolean(errors.UserId && touched.UserId)} helperText={touched.UserId && errors.UserId} />
            </Grid>

            <Grid item xs={12}>
              <H6 mb={1}>{t('Add Picture')}</H6>

              <label htmlFor="icon-button-file">
                <input type="file" accept="image/*" id="icon-button-file" style={{ display: "none" }} />
                <IconButton disableRipple component="span" sx={{ padding: 0, display: "block" }}>
                  <Box sx={{ minHeight: 40, display: "flex", borderRadius: "8px", alignItems: "center", justifyContent: "center", backgroundColor: "divider" }}>
                    <ImageUploadIcon sx={{ fontSize: 18, marginRight: 0.5, color: "text.disabled" }} />
                    <Small color="text.disabled">{t('Choose a file')}</Small>
                  </Box>
                </IconButton>
              </label>
            </Grid>

          </Grid>
        </ScrollBar>

        <FlexBox justifyContent="flex-end" marginTop={4}>
          <Button fullWidth size="small" variant="outlined" onClick={onClose} sx={{
            width: 124, fontSize: 12, marginRight: 2, color: "text.disabled", borderColor: "text.disabled"
          }}>
            {t('Cancel')}
          </Button>

          <Button fullWidth size="small" type="submit" variant="contained" sx={{ width: 124, fontSize: 12 }}>
            {t('Save')}
          </Button>
        </FlexBox>
      </form>
    </StyledModalCard>
  </Modal>;
};

export default AddModalOrganizations;