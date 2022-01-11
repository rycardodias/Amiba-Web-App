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
import * as eggsBatchsLinesRequests from 'lib/requests/eggsBatchsLinesRequests'

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { StyledModalCard, StyledMenuItem, StyledSelect } from 'components/backoffice/styledComponents/AddModalStyles'



const AddModal = ({ open, onClose, edit, data }) => {
  const { t } = useTranslation();

  const initialValues = {
    id: data?.id || "",
    quantity: data?.quantity || "",
    EggsBatchId: data?.ExplorationId || "",
    EggsBatchName: data?.EggsBatch?.name || ""
  };

  const [explorations, setexplorations] = useState([])
  const [eggsBatches, seteggsBatches] = useState([])

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

  async function followingData(e) {
    const res = await eggsBatchsRequests.getEggsBatchsByExploration(e.target.value)

    if (res.error || res.data.error) {
      toast.error(t("Error Getting essential Data"))
      seteggsBatches([])
    }
    seteggsBatches(res.data.data)
  }

  const fieldValidationSchema = Yup.object().shape({
    quantity: Yup.string().min(3, t("Too Short")).required(`${t('Name')} ${t('is required!')}`),
    EggsBatchId: Yup.string().required(`${t('Eggs Batch')} ${t('is required!')}`),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues, validationSchema: fieldValidationSchema, onSubmit: values => {
      if (edit) {
        eggsBatchsLinesRequests.updateEggsBatchsLines(values.id, values.quantity)
          .then(response => {
            if (response.error || response.data.error) return toast.error(t("Error Updating Record"));;
            onClose(true);
            toast.success(t("Record Updated Successfully"));
          })
          .catch(error => console.log(error));
      } else {
        eggsBatchsLinesRequests.createEggsBatchsLines(values.EggsBatchId, values.quantity)
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
            {!edit &&
              <Grid item xs={12}>
                <H6 mb={1}>{t('Exploration')}</H6>
                <StyledSelect fullWidth name="ExplorationId" value={values.ExplorationId} onChange={followingData} input={<InputBase placeholder={t('Exploration')} />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                  {explorations && explorations.map(item => {
                    return <StyledMenuItem key={item.id} value={item.id}>{t(item.name)}</StyledMenuItem>
                  })}
                </StyledSelect>
              </Grid>}

            {edit ?
              <Grid item xs={6}>
                <H6 mb={1}>{t('Eggs Batch')}</H6>
                <DarkTextField disabled name="EggsBatchId" value={values.EggsBatchName} />
              </Grid> :
              <Grid item xs={6}>
                <H6 mb={1}>{t('Eggs Batch')}</H6>
                <StyledSelect fullWidth name="EggsBatchId" value={values.EggsBatchId} onChange={handleChange} input={<InputBase placeholder={t('Eggs Batch')} />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                  {eggsBatches && eggsBatches.map(item => {
                    return <StyledMenuItem key={item.id} value={item.id}>{t(item.identifier)}</StyledMenuItem>
                  })}
                </StyledSelect>
              </Grid>
            }
            <Grid item xs={6}>
              <H6 mb={1}>{t('Quantity')}</H6>
              <DarkTextField name="quantity" placeholder={t('Quantity')} onChange={handleChange} value={values.quantity}
                error={Boolean(errors.quantity && touched.quantity)} helperText={touched.quantity && errors.quantity} />
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