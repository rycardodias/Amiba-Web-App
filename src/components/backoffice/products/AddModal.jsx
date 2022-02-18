import { IconButton, Box, Button, Grid, Modal, InputBase } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import ImageUploadIcon from "icons/ImageUploadIcon";

import DarkTextField from "components/DarkTextField";
import FlexBox from "components/FlexBox";
import { H2, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import ScrollBar from "simplebar-react";
import * as Yup from "yup";
import * as organizationsRequests from 'lib/requests/organizationsRequests'
import * as uploadFilesRequests from 'lib/requests/uploadFilesRequests'

import * as productsRequests from 'lib/requests/productsRequests'
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyledModalCard, StyledMenuItem, StyledSelect } from 'components/backoffice/styledComponents/AddModalStyles'
import { productTypes } from "lib/values/types";
import { taxes } from "lib/values/taxes";
import { units } from "lib/values/units";



const AddModal = ({ open, onClose, edit, data }) => {
  const { t } = useTranslation();
  const initialValues = {
    id: data?.id || "",
    name: data?.name || "",
    description: data?.description || "",
    type: data?.type || "",
    tax: data?.tax || "",
    price: data?.price || "",
    unit: data?.unit || "",
    image: data?.image || "",
    OrganizationId: data?.OrganizationId || "",
    OrganizationName: data?.Organization?.name || "",
  };

  const [organizations, setorganizations] = useState([])
  const [fileName, setfileName] = useState("");

  const saveImage = async (e) => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);

    const res = await uploadFilesRequests.createFile(data)

    if (res.data.data) {
      setfileName(res.data.data.fileName)
    }
  }

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
    type: Yup.string().required(`${t('Type')} ${t('is required!')}`),
    tax: Yup.string().required(`${t('Tax')} ${t('is required!')}`),
    name: Yup.string().required(`${t('Name')} ${t('is required!')}`),
    price: Yup.string().required(`${t('Price')} ${t('is required!')}`),
    // unit: Yup.string().required(`${t('Unit')} ${t('is required!')}`),
    OrganizationId: Yup.string().required(`${t('Productor')} ${t('is required!')}`),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues, validationSchema: fieldValidationSchema, onSubmit: values => {


      if (edit) {
        productsRequests.updateProduct(values.id, values.tax, values.name, values.description, values.price, fileName !== "" ? fileName : values.image)
          .then(response => {
            if (response.error || response.data.error) return toast.error(t("Error Updating Record"));;
            onClose(true);
            toast.success(t("Record Updated Successfully"));
          })
          .catch(error => console.log(error));
      } else {
        productsRequests.createProduct(values.type, values.tax, values.name, values.description, values.price, values.type === "ANIMAL" ? "UNIT" : "DOZEN", fileName !== "" ? fileName : values.image, values.OrganizationId)
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
      <H2 mb={2}>{edit ? `${t("Edit")} ${t("Product")}` : `${t("Add new")} ${t("Product")}`}</H2>

      <form onSubmit={handleSubmit} >
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
                <H6 mb={1}>{t('Productor')}</H6>
                <DarkTextField disabled name="OrganizationId" value={values.OrganizationName} />
              </Grid> :
              <Grid item xs={6}>
                <H6 mb={1}>{t('Productor')}</H6>
                <StyledSelect fullWidth name="OrganizationId" value={values.OrganizationId} onChange={handleChange} input={<InputBase placeholder={t('Productor')} />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                  {organizations && organizations.map(item => {
                    return <StyledMenuItem key={item.id} value={item.id}>{t(item.name)}</StyledMenuItem>
                  })}
                </StyledSelect>
              </Grid>
            }

            {edit ?
              <Grid item xs={6}>
                <H6 mb={1}>{t('Type')}</H6>
                <DarkTextField disabled name="type" value={values.type} />
              </Grid> :
              <Grid item xs={6}>
                <H6 mb={1}>{t('Type')}</H6>
                <StyledSelect fullWidth name="type" value={values.type} onChange={handleChange} input={<InputBase placeholder={t('Type')} />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                  {productTypes && productTypes.map(item => {
                    return <StyledMenuItem key={item.id} value={item.id}>{t(item.name)}</StyledMenuItem>
                  })}
                </StyledSelect>
              </Grid>
            }

            {/* {edit ?
              <Grid item xs={6}>
                <H6 mb={1}>{t('Unit')}</H6>
                <DarkTextField disabled name="unit" value={values.unit} />
              </Grid> :
              <Grid item xs={6}>
                <H6 mb={1}>{t('Unit')}</H6>
                <StyledSelect fullWidth name="unit" value={values.unit} onChange={handleChange} input={<InputBase placeholder={t('Unit')} />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                  {units && units.map(item => {
                    return <StyledMenuItem key={item.id} value={item.id}>{t(item.name)}</StyledMenuItem>
                  })}
                </StyledSelect>
              </Grid>
            } */}

            <Grid item xs={6}>
              <H6 mb={1}>{t('Tax')}</H6>
              <StyledSelect fullWidth name="tax" value={values.tax} onChange={handleChange} input={<InputBase placeholder={t('Tax')} />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                {taxes && taxes.map(item => {
                  return <StyledMenuItem key={item.id} value={item.id}>{t(item.name)}</StyledMenuItem>
                })}
              </StyledSelect>
            </Grid>

            <Grid item xs={6}>
              <H6 mb={1}>{t('Price')}</H6>
              <DarkTextField name="price" placeholder={t('Price')} onChange={handleChange} value={values.price}
                error={Boolean(errors.price && touched.price)} helperText={touched.price && errors.price} />
            </Grid>

            

            <Grid item xs={12}>
              <H6 mb={1}>{t('Add Picture')}</H6>
              <label htmlFor="image">
                <input onChange={saveImage} type="file" accept="image/*" id="image" style={{ display: "none" }} />
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