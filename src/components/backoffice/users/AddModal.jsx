import { Button, Grid, Modal, InputBase } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import DarkTextField from "components/DarkTextField";
import FlexBox from "components/FlexBox";
import { H2, H6 } from "components/Typography";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import ScrollBar from "simplebar-react";
import * as Yup from "yup";
import * as usersRequests from 'lib/requests/usersRequests'
import { useTranslation } from "react-i18next";

import { StyledModalCard, StyledMenuItem, StyledSelect } from 'components/backoffice/styledComponents/AddModalStyles'
import { userPermissions } from "lib/values/permissions";

const AddModal = ({ open, onClose, edit, data }) => {
  const { t } = useTranslation();

  const initialValues = {
    id: data?.id || "",
    name: data?.name || "",
    fiscalNumber: data?.fiscalNumber || "",
    permission: data?.permission || "",
  };

  const fieldValidationSchema = Yup.object().shape({
    permission: Yup.string().required(`${t('Permission')} ${t('is required!')}`),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues, validationSchema: fieldValidationSchema, onSubmit: values => {
      if (edit) {
        usersRequests.updateUserPermissions(values.id, values.permission)
          .then(response => {
            if (response.error || response.data.error) return toast.error(t("Error Updating Record"));;
            onClose(true);
            toast.success(t("Record Updated Successfully"));
          })
          .catch(error => console.log(error));
      }
    }
  });


  return <Modal open={open} onClose={onClose}>
    <StyledModalCard>
      <H2 mb={2}>{edit ? `${t("Edit")} ${t("User")}` : `${t("Add new")} ${t("User")}`}</H2>

      <form onSubmit={handleSubmit}>
        <ScrollBar style={{ maxHeight: 400 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <H6 mb={1}>{t('Name')}</H6>
              <DarkTextField disabled name="name" value={values.name} />
            </Grid>

            <Grid item xs={6}>
              <H6 mb={1}>{t('VAT Number')}</H6>
              <DarkTextField disabled name="fiscalNumber" value={values.fiscalNumber} />
            </Grid>

            <Grid item xs={6}>
              <H6 mb={1}>{t('Permission')}</H6>
              <StyledSelect fullWidth name="permission" value={values.permission} onChange={handleChange} input={<InputBase placeholder={t('Permission')} />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                {userPermissions && userPermissions.map(item => {
                  return <StyledMenuItem key={item.id} value={item.id}>{t(item.name)}</StyledMenuItem>
                })}
              </StyledSelect>
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