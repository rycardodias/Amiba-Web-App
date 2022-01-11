import { Button, Grid, Modal, InputBase } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import DarkTextField from "components/DarkTextField";
import FlexBox from "components/FlexBox";
import { H2, H6 } from "components/Typography";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import ScrollBar from "simplebar-react";
import * as Yup from "yup";
import * as eggsBatchsRequests from 'lib/requests/eggsBatchsRequests'
import * as explorationsRequests from 'lib/requests/explorationsRequests'
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { StyledModalCard, StyledMenuItem, StyledSelect } from 'components/backoffice/styledComponents/AddModalStyles'



const AddModal = ({ open, onClose, edit, data }) => {
  const { t } = useTranslation();

  const initialValues = {
    id: data?.id || "",
    name: data?.name || "",
    ExplorationId: data?.ExplorationId || "",
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
    name: Yup.string().min(3, t("Too Short")).required(`${t('Name')} ${t('is required!')}`),
    ExplorationId: Yup.string().required(`${t('Exploration')} ${t('is required!')}`),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues, validationSchema: fieldValidationSchema, onSubmit: values => {
      if (edit) {
        eggsBatchsRequests.updateEggsBatch(values.id, values.name)
          .then(response => {
            if (response.error || response.data.error) return toast.error(t("Error Updating Record"));;
            onClose(true);
            toast.success(t("Record Updated Successfully"));
          })
          .catch(error => console.log(error));
      } else {
        eggsBatchsRequests.createEggsBatch(values.name, values.ExplorationId)
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
              <H6 mb={1}>{t('Name')}</H6>
              <DarkTextField name="name" placeholder={t('Name')} onChange={handleChange} value={values.name}
                error={Boolean(errors.name && touched.name)} helperText={touched.name && errors.name} />
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