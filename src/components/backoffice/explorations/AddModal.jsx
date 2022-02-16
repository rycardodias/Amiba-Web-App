import { Button, Grid, Modal, InputBase } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import DarkTextField from "components/DarkTextField";
import FlexBox from "components/FlexBox";
import { H2, H6 } from "components/Typography";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import ScrollBar from "simplebar-react";
import * as Yup from "yup";
import * as organizationsRequests from 'lib/requests/organizationsRequests'
import * as explorationsRequests from 'lib/requests/explorationsRequests'
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { StyledModalCard, StyledMenuItem, StyledSelect } from 'components/backoffice/styledComponents/AddModalStyles'
import { explorationTypes } from "lib/values/types";



const AddModal = ({ open, onClose, edit, data }) => {
  const { t } = useTranslation();

  const initialValues = {
    id: data?.id || "",
    name: data?.name || "",
    marker: data?.marker || "",
    type: data?.type || "",
    OrganizationId: data?.OrganizationId || "",
    address: data?.address || "",
    locale: data?.locale || "",
    zipcode: data?.zipcode || "",
    fiscalNumber: data?.fiscalNumber || "",
    telephone: data?.telephone || "",
    mobilePhone: data?.mobilePhone || "",
    gpsLocalization: data?.gpsLocalization || "",
    OrganizationName: data?.Organization?.name || ""
  };

  const [organizations, setorganizations] = useState([])

  async function initialData() {
    if (edit) return

    const res = await organizationsRequests.getOrganizations()
    if (res.error) return
    if (res.data.error) return toast.error(t("Error Getting essential Data"))
    setorganizations(res.data.data)

  }

  useEffect(() => {
    initialData()
  }, [])


  const fieldValidationSchema = Yup.object().shape({
    name: Yup.string().min(3, t("Too Short")).required(`${t('Name')} ${t('is required!')}`),
    marker: Yup.string().min(5, t("Too Short")).max(5, t("Too Long")).required(`${t('Marker')} ${t('is required!')}`),
    type: Yup.string().required(`${t('Type')} ${t('is required!')}`),
    OrganizationId: Yup.string().required(`${t('Organization')} ${t('is required!')}`),
    address: Yup.string().min(6, t("Too Short")).required(`${t('Name')} ${t('is required!')}`),
    locale: Yup.string().min(6, t("Too Short")).required(`${t('Locale')} ${t('is required!')}`),
    zipcode: Yup.string().min(6, t("Too Short")).required(`${t('Zip Code')} ${t('is required!')}`),
    fiscalNumber: Yup.string().min(9, t("Too Short")).max(9, t("Too Long")).required(`${t('VAT Number')} ${t('is required!')}`),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues, validationSchema: fieldValidationSchema, onSubmit: values => {
      if (edit) {
        explorationsRequests.updateExploration(values.id, values.type, values.name, values.marker, values.address, values.locale,
          values.zipcode, values.fiscalNumber, values.telephone, values.mobilePhone, values.gpsLocalization)
          .then(response => {
            if (response.error || response.data.error) return toast.error(t("Error Updating Record"));;
            onClose(true);
            toast.success(t("Record Updated Successfully"));
          })
          .catch(error => console.log(error));
      } else {
        explorationsRequests.createExploration(values.OrganizationId, values.type, values.name, values.marker, values.address, values.locale,
          values.zipcode, values.fiscalNumber, values.telephone, values.mobilePhone, values.gpsLocalization)
          .then(response => {
            if (response.error || response.data.error) return toast.error(t("Error Creating Record"));

            onClose(true);
            toast.success(t("New Record Added Successfully"));
          })
          .catch(error => console.log(error));
      }
    }
  });


  return <Modal open={open} onClose={onClose}>
    <StyledModalCard>
      <H2 mb={2}>{edit ? `${t("Edit")} ${t("Exploration")}` : `${t("Add new")} ${t("Exploration")}`}</H2>

      <form onSubmit={handleSubmit}>
        <ScrollBar style={{ maxHeight: 400 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <H6 mb={1}>{t('Name')}</H6>
              <DarkTextField name="name" placeholder={t('Name')} onChange={handleChange} value={values.name} error={Boolean(errors.name && touched.name)} helperText={touched.name && errors.name} />
            </Grid>
            <Grid item xs={12}>
              <H6 mb={1}>{t('Marker')}</H6>
              <DarkTextField name="marker" placeholder={t('Marker')} onChange={handleChange} value={values.marker} error={Boolean(errors.marker && touched.marker)} helperText={touched.marker && errors.marker} />
            </Grid>

            <Grid item xs={6}>
              <H6 mb={1}>{t('Type')}</H6>
              <StyledSelect fullWidth name="type" value={values.type} onChange={handleChange} input={<InputBase placeholder={t('Type')} />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                {explorationTypes && explorationTypes.map(item => {
                  return <StyledMenuItem key={item.id} value={item.id}>{t(item.name)}</StyledMenuItem>
                })}
              </StyledSelect>
            </Grid>

            {edit ?
              <Grid item xs={6}>
                <H6 mb={1}>{t('Organization')}</H6>
                <DarkTextField disabled name="OrganizationId" value={values.OrganizationName} />
              </Grid> :
              <Grid item xs={6}>
                <H6 mb={1}>{t('Organization')}</H6>
                <StyledSelect fullWidth name="OrganizationId" value={values.OrganizationId} onChange={handleChange} input={<InputBase placeholder={t('Organization')} />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                  {organizations && organizations.map(item => {
                    return <StyledMenuItem key={item.id} value={item.id}>{t(item.name)}</StyledMenuItem>
                  })}
                </StyledSelect>
              </Grid>
            }

            <Grid item xs={6}>
              <H6 mb={1}>{t('Telephone')}</H6>
              <DarkTextField name="telephone" placeholder={t('telephone')} onChange={handleChange} value={values.telephone}
                error={Boolean(errors.telephone && touched.telephone)} helperText={touched.telephone && errors.telephone} />
            </Grid>
            <Grid item xs={6}>
              <H6 mb={1}>{t('Mobile Phone')}</H6>
              <DarkTextField name="mobilePhone" placeholder={t('mobilePhone')} onChange={handleChange} value={values.mobilePhone}
                error={Boolean(errors.mobilePhone && touched.mobilePhone)} helperText={touched.mobilePhone && errors.mobilePhone} />
            </Grid>

            <Grid item xs={6}>
              <H6 mb={1}>{t('VAT Number')}</H6>
              <DarkTextField name="fiscalNumber" placeholder={t('VAT Number')} onChange={handleChange} value={values.fiscalNumber}
                error={Boolean(errors.fiscalNumber && touched.fiscalNumber)} helperText={touched.fiscalNumber && errors.fiscalNumber} />
            </Grid>
            <Grid item xs={6}>
              <H6 mb={1}>{t('GPS Localization')}</H6>
              <DarkTextField name="gpsLocalization" placeholder={t('GPS Localization')} onChange={handleChange} value={values.gpsLocalization}
                error={Boolean(errors.gpsLocalization && touched.gpsLocalization)} helperText={touched.gpsLocalization && errors.gpsLocalization} />
            </Grid>

            <Grid item xs={12}>
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
          </Grid>
        </ScrollBar>

        <FlexBox justifyContent="flex-end" marginTop={4}>
          <Button fullWidth size="small" variant="outlined" onClick={onClose} sx={{ width: 124, fontSize: 12, marginRight: 2, color: "text.disabled", borderColor: "text.disabled" }}>
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

export default AddModal;