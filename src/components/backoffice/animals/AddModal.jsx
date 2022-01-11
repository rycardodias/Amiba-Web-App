import { Button, Grid, Modal, InputBase } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import DarkTextField from "components/DarkTextField";
import FlexBox from "components/FlexBox";
import { H2, H6 } from "components/Typography";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import ScrollBar from "simplebar-react";
import * as Yup from "yup";
import * as animalsRequests from 'lib/requests/animalsRequests'
import * as explorationsRequests from 'lib/requests/explorationsRequests'
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { StyledModalCard, StyledMenuItem, StyledSelect } from 'components/backoffice/styledComponents/AddModalStyles'
import { genders, races } from "lib/values/types";



const AddModal = ({ open, onClose, edit, data }) => {
  const { t } = useTranslation();

  const initialValues = {
    id: data?.id || "",
    identifier: data?.identifier || "",
    ExplorationId: data?.ExplorationId || "",
    race: data?.race || "",
    gender: data?.gender || "",
    birthDate: data?.birthDate || "",
    slaughterDate: data?.slaughterDate || "",
    slaughterWeight: data?.slaughterWeight || "",
    slaughterLocal: data?.slaughterLocal || "",
    breeder: data?.breeder || "",
    ExplorationName: data?.Exploration?.name || ""
  };

  const [explorations, setexplorations] = useState([])

  async function initialData() {
    if (edit) return

    const res = await explorationsRequests.getExplorations()
    if (res.error) return
    if (res.data.error) return toast.error(t("Error Getting essential Data"))
    setexplorations(res.data.data)

  }

  useEffect(() => {
    initialData()
  }, [])

  const fieldValidationSchema = Yup.object().shape({
    identifier: Yup.string().min(3, t("Too Short")).required(`${t('Identifier')} ${t('is required!')}`),
    race: Yup.string().required(`${t('Race')} ${t('is required!')}`),
    ExplorationId: Yup.string().required(`${t('Exploration')} ${t('is required!')}`),
    birthDate: Yup.date().required(`${t('Birth Date')} ${t('is required!')}`),
    weight: Yup.string().required(`${t('Weight')} ${t('is required!')}`),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues, validationSchema: fieldValidationSchema, onSubmit: values => {
      if (edit) {
        animalsRequests.updateAnimal(values.id, values.slaughterDate, values.slaughterWeight, values.slaughterLocal, values.breeder)
          .then(response => {
            if (response.error || response.data.error) return toast.error(t("Error Updating Record"));;
            onClose(true);
            toast.success(t("Record Updated Successfully"));
          })
          .catch(error => console.log(error));
      } else {
        animalsRequests.createAnimal(values.identifier, values.race, values.ExplorationId, values.gender, values.birthDate, values.weight)
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
      <H2 mb={2}>{edit ? `${t("Edit")} ${t("Animal")}` : `${t("Add new")} ${t("Animal")}`}</H2>

      <form onSubmit={handleSubmit}>
        <ScrollBar style={{ maxHeight: 400 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <H6 mb={1}>{t('Identifier')}</H6>
              <DarkTextField disabled={edit} name="identifier" placeholder={t('Identifier')} onChange={handleChange} value={values.identifier}
                error={Boolean(errors.identifier && touched.identifier)} helperText={touched.identifier && errors.identifier} />
            </Grid>

            {edit ?
              <Grid item xs={6}>
                <H6 mb={1}>{t('Exploration')}</H6>
                <DarkTextField disabled name="ExplorationId" value={values.ExplorationName} />
              </Grid> :
              <Grid item xs={6}>
                <H6 mb={1}>{t('Exploration')}</H6>
                <StyledSelect fullWidth name="ExplorationId" value={values.ExplorationId} onChange={handleChange} input={<InputBase placeholder={t('Exploration')} />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                  {explorations && explorations.map(item => {
                    return <StyledMenuItem key={item.id} value={item.id}>{t(item.name)}</StyledMenuItem>
                  })}
                </StyledSelect>
              </Grid>
            }

            <Grid item xs={6}>
              <H6 mb={1}>{t('Race')}</H6>
              <StyledSelect disabled={edit} fullWidth name="race" value={values.race} onChange={handleChange} input={<InputBase placeholder={t('Race')} />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                {races && races.map(item => {
                  return <StyledMenuItem key={item.id} value={item.id}>{t(item.name)}</StyledMenuItem>
                })}
              </StyledSelect>
            </Grid>
            <Grid item xs={6}>
              <H6 mb={1}>{t('Gender')}</H6>
              <StyledSelect disabled={edit} fullWidth name="gender" value={values.gender} onChange={handleChange} input={<InputBase placeholder={t('Gender')} />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                {genders && genders.map(item => {
                  return <StyledMenuItem key={item.id} value={item.id}>{t(item.name)}</StyledMenuItem>
                })}
              </StyledSelect>
            </Grid>

            <Grid item xs={6}>
              <H6 mb={1}>{t('Birth Date')}</H6>
              <DarkTextField disabled={edit} name="birthdate" type="date" placeholder="dd/mm/yyyy" onChange={handleChange} value={values.birthdate}
                error={Boolean(errors.birthdate && touched.birthdate)} helperText={touched.birthdate && errors.birthdate} />
            </Grid>

            <Grid item xs={6}>
              <H6 mb={1}>{t('Weight')}</H6>
              <DarkTextField disabled={edit} name="weight" placeholder={t('Weight')} onChange={handleChange} value={values.weight}
                error={Boolean(errors.weight && touched.weight)} helperText={touched.weight && errors.weight} />
            </Grid>
            {edit && (
              <>
                <Grid item xs={6}>
                  <H6 mb={1}>{t('Slaughter Date')}</H6>
                  <DarkTextField name="slaughterDate" type="date" placeholder="dd/mm/yyyy" onChange={handleChange} value={values.slaughterDate}
                    error={Boolean(errors.slaughterDate && touched.slaughterDate)} helperText={touched.slaughterDate && errors.slaughterDate} />
                </Grid>

                <Grid item xs={6}>
                  <H6 mb={1}>{t('Slaughter Weight')}</H6>
                  <DarkTextField name="slaughterWeight" placeholder={t('Slaughter Weight')} onChange={handleChange} value={values.slaughterWeight}
                    error={Boolean(errors.slaughterWeight && touched.slaughterWeight)} helperText={touched.slaughterWeight && errors.slaughterWeight} />
                </Grid>

                <Grid item xs={6}>
                  <H6 mb={1}>{t('Slaughter Local')}</H6>
                  <DarkTextField name="slaughterLocal" placeholder={t('Slaughter Local')} onChange={handleChange} value={values.slaughterLocal}
                    error={Boolean(errors.slaughterLocal && touched.slaughterLocal)} helperText={touched.slaughterLocal && errors.slaughterLocal} />
                </Grid>

                <Grid item xs={6}>
                  <H6 mb={1}>{t('Breeder')}</H6>
                  <DarkTextField name="breeder" placeholder={t('Breeder')} onChange={handleChange} value={values.breeder}
                    error={Boolean(errors.breeder && touched.breeder)} helperText={touched.breeder && errors.breeder} />
                </Grid>
              </>
            )}
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