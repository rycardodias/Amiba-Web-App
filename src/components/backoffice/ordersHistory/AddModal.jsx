import { Button, Grid, Modal, InputBase } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import DarkTextField from "components/DarkTextField";
import FlexBox from "components/FlexBox";
import { H2, H6 } from "components/Typography";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import ScrollBar from "simplebar-react";
import * as Yup from "yup";
import * as ordersRequests from 'lib/requests/ordersRequests'
import * as orderHistoryRequests from 'lib/requests/orderHistoryRequests'
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyledModalCard, StyledMenuItem, StyledSelect } from 'components/backoffice/styledComponents/AddModalStyles'
import { ordersHistoryTypes } from "lib/values/types";

const AddModal = ({ open, onClose, edit, data }) => {
  const { t } = useTranslation();

  const initialValues = {
    id: data?.id || "",
    OrderId: data?.OrderId || "",
    state: data?.state || "",
  };

  const [orders, setorders] = useState([])

  async function initialData() {
    if (edit) return

    const res = await ordersRequests.getOrdersUserId()
    if (res.error) return
    if (res.data.error) return toast.error(t("Error Getting essential Data"))
    setorders(res.data.data)

  }

  useEffect(() => {
    initialData()
  }, [])


  const fieldValidationSchema = Yup.object().shape({
    OrderId: Yup.string().required(`${t('Order')} ${t('is required!')}`),
    state: Yup.string().required(`${t('State')} ${t('is required!')}`),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues, validationSchema: fieldValidationSchema, onSubmit: values => {
      if (edit) {
        orderHistoryRequests.updateOrderHistory(values.id, values.state)
          .then(response => {
            if (response.error || response.data.error) return toast.error(t("Error Updating Record"));;
            onClose(true);
            toast.success(t("Record Updated Successfully"));
          })
          .catch(error => console.log(error));
      } else {
        orderHistoryRequests.createOrderHistory(values.state, values.OrderId)
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
      <H2 mb={2}>{edit ? `${t("Edit")} ${t("Order History")}` : `${t("Add new")} ${t("Order History")}`}</H2>

      <form onSubmit={handleSubmit}>
        <ScrollBar style={{ maxHeight: 400 }}>
          <Grid container spacing={2}>
            {edit ?
              <Grid item xs={12}>
                <H6 mb={1}>{t('Order')}</H6>
                <DarkTextField disabled name="OrderId" value={values.OrderId} />
              </Grid> :
              <Grid item xs={12}>
                <H6 mb={1}>{t('Order')}</H6>
                <StyledSelect fullWidth name="OrderId" value={values.OrderId} onChange={handleChange} input={<InputBase placeholder={t('Order')} />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                  {orders && orders.map(item => {
                    return <StyledMenuItem key={item.id} value={item.id}>{`${t(item.id)} - ${item.fiscalNumber} - ${item.User.name}`}</StyledMenuItem>
                  })}
                </StyledSelect>
              </Grid>
            }

            <Grid item xs={12}>
              <H6 mb={1}>{t('State')}</H6>
              <StyledSelect fullWidth name="state" value={values.state} onChange={handleChange} input={<InputBase placeholder={t('State')} />} IconComponent={() => <KeyboardArrowDown fontSize="small" />}>
                {ordersHistoryTypes && ordersHistoryTypes.filter(item => item.id !== values.state).map(item => {
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