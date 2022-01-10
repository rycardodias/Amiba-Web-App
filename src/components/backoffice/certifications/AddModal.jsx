import { Button, Grid, Modal, InputBase } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import DarkTextField from "components/DarkTextField";
import FlexBox from "components/FlexBox";
import { H2, H6 } from "components/Typography";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import ScrollBar from "simplebar-react";
import * as Yup from "yup";
import * as certificationsRequests from 'lib/requests/certificationsRequests'
import * as explorationsRequests from 'lib/requests/explorationsRequests'
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyledModalCard, StyledMenuItem, StyledSelect } from 'components/backoffice/styledComponents/AddModalStyles'



const AddModal = ({ open, onClose, edit, data }) => {
  const { t } = useTranslation();

  const initialValues = {
    id: data?.id || "",
    certificationCode: data?.certificationCode || "",
    description: data?.description || "",
    ExplorationId: data?.ExplorationId || "",
    initialDate: data?.initialDate || "",
    finalDate: data?.finalDate || "",
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
    certificationCode: Yup.string().required(`${t('Exploration')} ${t('is required!')}`),
    ExplorationId: Yup.string().required(`${t('Exploration')} ${t('is required!')}`),
    initialDate: Yup.date().required(`${t('Initial Date')} ${t('is required!')}`),
    finalDate: Yup.date().required(`${t('Final Date')} ${t('is required!')}`),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues, validationSchema: fieldValidationSchema, onSubmit: values => {
      if (edit) {
        certificationsRequests.updateCertification(values.id, values.description, values.finalDate)
          .then(response => {
            if (response.error || response.data.error) return toast.error(t("Error Updating Record"));;
            onClose(true);
            toast.success(t("Record Updated Successfully"));
          })
          .catch(error => console.log(error));
      } else {
        certificationsRequests.createCertification(values.ExplorationId, values.certificationCode, values.initialDate, values.finalDate, values.description)
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
      <H2 mb={2}>{edit ? `${t("Edit")} ${t("Certification")}` : `${t("Add new")} ${t("Certification")}`}</H2>

      <form onSubmit={handleSubmit}>
        <ScrollBar style={{ maxHeight: 400 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <H6 mb={1}>{t('Certification Code')}</H6>
              <DarkTextField disabled={edit} name="certificationCode" placeholder={t('Certification Code')} onChange={handleChange} value={values.certificationCode}
                error={Boolean(errors.certificationCode && touched.certificationCode)} helperText={touched.certificationCode && errors.certificationCode} />
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
              <H6 mb={1}>{t('Initial Date')}</H6>
              <DarkTextField name="initialDate" placeholder="dd/mm/yyyy" onChange={handleChange} value={values.initialDate}
                error={Boolean(errors.initialDate && touched.initialDate)} helperText={touched.initialDate && errors.initialDate} />
            </Grid>
            <Grid item xs={6}>
              <H6 mb={1}>{t('Final Date')}</H6>
              <DarkTextField name="finalDate" placeholder="dd/mm/yyyy" onChange={handleChange} value={values.finalDate}
                error={Boolean(errors.finalDate && touched.finalDate)} helperText={touched.finalDate && errors.finalDate} />
            </Grid>


            <Grid item xs={12}>
              <H6 mb={1}>{t('Description')}</H6>
              <DarkTextField name="description" placeholder={t('Description')} onChange={handleChange} value={values.description}
                error={Boolean(errors.description && touched.description)} helperText={touched.description && errors.description} />
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