import { Button, Grid, Modal, InputBase } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import DarkTextField from "components/DarkTextField";
import FlexBox from "components/FlexBox";
import { H2, H6 } from "components/Typography";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import ScrollBar from "simplebar-react";
import * as Yup from "yup";
import * as restaurantsRequests from 'lib/requests/restaurantsRequests'
import * as menusRequests from 'lib/requests/menusRequests'
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyledModalCard, StyledMenuItem, StyledSelect } from 'components/backoffice/styledComponents/AddModalStyles'



const AddModal = ({ open, onClose, edit, data }) => {
  const { t } = useTranslation();

  const initialValues = {
    id: data?.id || "",
    name: data?.name || "",
    description: data?.description || "",
    active: data?.active || "",
    image: data?.image || "",
    RestaurantId: data?.RestaurantId || "",
    RestaurantName: data?.Restaurant?.name || ""
  };

  const [restaurants, setrestaurants] = useState([])

  async function initialData() {
    if (edit) return

    const res = await restaurantsRequests.getRestaurants()
    if (res.error) return
    if (res.data.error) return toast.error(t("Error Getting essential Data"))
    setrestaurants(res.data.data)

  }

  useEffect(() => {
    initialData()
  }, [])


  const fieldValidationSchema = Yup.object().shape({
    name: Yup.string().required(`${t('Name')} ${t('is required!')}`),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues, validationSchema: fieldValidationSchema, onSubmit: values => {
      if (edit) {
        menusRequests.updateMenu(values.id, values.name, values.description, values.image, values.active)
          .then(response => {
            if (response.error || response.data.error) return toast.error(t("Error Updating Record"));;
            onClose(true);
            toast.success(t("Record Updated Successfully"));
          })
          .catch(error => console.log(error));
      } else {
        menusRequests.createMenu(values.RestaurantId, values.name, values.description, values.image, values.active || true)
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
      <H2 mb={2}>{edit ? `${t("Edit")} ${t("Menu")}` : `${t("Add new")} ${t("Menu")}`}</H2>

      <form onSubmit={handleSubmit}>
        <ScrollBar style={{ maxHeight: 400 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <H6 mb={1}>{t('Name')}</H6>
              <DarkTextField name="name" placeholder={t('Name')} onChange={handleChange} value={values.name}
                error={Boolean(errors.name && touched.name)} helperText={touched.name && errors.name} />
            </Grid>
            <Grid item xs={12}>
              <H6 mb={1}>{t('Description')}</H6>
              <DarkTextField name="description" placeholder={t('Description')} onChange={handleChange} value={values.description}
                error={Boolean(errors.description && touched.description)} helperText={touched.description && errors.description} />
            </Grid>

            {edit ?
              <Grid item xs={6}>
                <H6 mb={1}>{t('Restaurant')}</H6>
                <DarkTextField disabled name="RestaurantId" value={values.RestaurantName} />
              </Grid> :
              <Grid item xs={6}>
                <H6 mb={1}>{t('Restaurant')}</H6>
                <StyledSelect fullWidth name="RestaurantId" value={values.RestaurantId} onChange={handleChange} input={<InputBase placeholder={t('Restaurant')} />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                  {restaurants && restaurants.map(item => {
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