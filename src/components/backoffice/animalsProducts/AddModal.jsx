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
import * as productsRequests from 'lib/requests/productsRequests'
import * as explorationsRequests from 'lib/requests/explorationsRequests'

import * as animalProductsRequests from 'lib/requests/animalProductsRequests'
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { StyledModalCard, StyledMenuItem, StyledSelect } from 'components/backoffice/styledComponents/AddModalStyles'
import { genders, races } from "lib/values/types";


const AddModal = ({ open, onClose, edit, data }) => {
  const { t } = useTranslation();

  const initialValues = {
    id: data?.id || "",
    quantity: data?.quantity || "",
    weight: data?.weight || "",
    AnimalId: data?.AnimalId || "",
    ProductId: data?.ProductId || "",
    ProductName: data?.Exploration?.name || ""
  };

  const [animals, setanimals] = useState([])
  const [products, setproducts] = useState([])
  const [explorations, setexplorations] = useState([])
  const [enableWeight, setenableWeight] = useState(false)


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
    const res = await animalsRequests.getAnimalsExplorationIdCertificated(e.target.value)

    if (res.error) { console.error(res.error); setanimals([]) }

    if (res.data.error) {
      console.error(res.data.error)
      setanimals([])
    } else {
      setanimals(res.data.data)
    }

    const res2 = await productsRequests.getProductByExploration(e.target.value, 'ANIMAL')

    if (res2.error) { console.error(res2.error); setproducts([]) }

    if (res2.data.error) {
      console.error(res2.data.error)
      setproducts([])
    } else {
      setproducts(res2.data.data)
    }
  }

  function handleWeight(e) {
    handleChange(e)
    const product = products.find(product => product.id === e.target.value)

    product && product.unit === 'KG' ? setenableWeight(true) : setenableWeight(false)
  }

  const fieldValidationSchema = Yup.object().shape({
    quantity: Yup.string().required(`${t('Quantity')} ${t('is required!')}`),
    AnimalId: Yup.string().required(`${t('Animal')} ${t('is required!')}`),
    ProductId: Yup.string().required(`${t('Product')} ${t('is required!')}`),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues, validationSchema: fieldValidationSchema, onSubmit: values => {
      if (edit) {
        animalProductsRequests.updateAnimalProducts(values.id, values.quantity, values.weight)
          .then(response => {
            if (response.error || response.data.error) return toast.error(t("Error Updating Record"));;
            onClose(true);
            toast.success(t("Record Updated Successfully"));
          })
          .catch(error => console.log(error));
      } else {
        animalProductsRequests.createAnimalProducts(values.ProductId, values.AnimalId, values.quantity, values.weight)
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
      <H2 mb={2}>{edit ? `${t("Edit")} ${t("Animal/Product")}` : `${t("Add new")} ${t("Animal/Product")}`}</H2>

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
                <H6 mb={1}>{t('Product')}</H6>
                <DarkTextField disabled name="ProductId" value={values.ProductName} />
              </Grid> :
              <Grid item xs={6}>
                <H6 mb={1}>{t('Product')}</H6>
                <StyledSelect fullWidth name="ProductId" value={values.ProductId} onChange={(e) => { handleChange(e); handleWeight(e) }} input={<InputBase placeholder={t('Product')} />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                  {products && products.map(item => {
                    return <StyledMenuItem key={item.id} value={item.id}>{t(item.name)}</StyledMenuItem>
                  })}
                </StyledSelect>
              </Grid>
            }

            {edit ?
              <Grid item xs={6}>
                <H6 mb={1}>{t('Animal')}</H6>
                <DarkTextField disabled name="AnimalId" value={values.AnimalId} />
              </Grid> :
              <Grid item xs={6}>
                <H6 mb={1}>{t('Animal')}</H6>
                <StyledSelect fullWidth name="AnimalId" value={values.AnimalId} onChange={handleChange} input={<InputBase placeholder={t('Animal')} />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                  {animals && animals.map(item => {
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
            {enableWeight &&
              <Grid item xs={6}>
                <H6 mb={1}>{t('Weight')}</H6>
                <DarkTextField name="weight" placeholder={t('Weight')} onChange={handleChange} value={values.weight}
                  error={Boolean(errors.weight && touched.weight)} helperText={touched.weight && errors.weight} />
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