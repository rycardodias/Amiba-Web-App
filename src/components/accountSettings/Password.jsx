import { Box, Button, Card, } from "@mui/material";
import LightTextField from "components/LightTextField";
import { H5, H6, Tiny } from "components/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { updatePassword } from "lib/requests/usersRequests";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";



const Password = () => {
  const { t } = useTranslation();
  const initialValues = {
    oldPassword: "",
    password: "",
    password2: "",
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required(`${t('Current Password')} ${t('is required!')}`),
    newPassword: Yup.string().min(8,  t("Too Short")).required(`${t('Password')} ${t('is required!')}`),
    newPassword2: Yup.string().min(8,  t("Too Short")).required(`${t('Password')} ${t('is required!')}`)
      .oneOf([Yup.ref('newPassword'), null], t("Passwords don't match!"))
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      updatePassword(values.oldPassword, values.newPassword)
        .then(response => {
          if (response.error || response.data.error) {
            toast.error(t("Error Changing Password"));
          } else {
            toast.success(t("Password Changed Successfully"));
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  });

  

  return <Card sx={{ padding: 3, pb: 5, "& li": { fontSize: 10, fontWeight: 500, color: "text.disabled" } }}>
    <H5>{t("Change Your Password")}</H5>

    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Box maxWidth={350}>
        <LightTextField fullWidth sx={{ mt: 2 }} name="oldPassword" type="password"
          onBlur={handleBlur} onChange={handleChange} value={values.oldPassword || ""}
          error={Boolean(touched.oldPassword && errors.oldPassword)} helperText={touched.oldPassword && errors.oldPassword} placeholder={t("Enter current password")} />
        <LightTextField fullWidth sx={{ mt: 2 }} name="newPassword" type="password"
          onBlur={handleBlur} onChange={handleChange} value={values.newPassword || ""}
          error={Boolean(touched.newPassword && errors.newPassword)} helperText={touched.newPassword && errors.newPassword} placeholder={t("Enter new password")} />
        <LightTextField fullWidth sx={{ mt: 2 }} name="newPassword2" type="password"
          onBlur={handleBlur} onChange={handleChange} value={values.newPassword2 || ""}
          error={Boolean(touched.newPassword2 && errors.newPassword2)} helperText={touched.newPassword2 && errors.newPassword2} placeholder={t("Confirm new password")} />


        <Box my={3}>
          <H6>{t("Password requirements:")}</H6>
          <Tiny fontWeight={500} color="text.disabled">
            {t("Ensure that these requirements are met:")}
          </Tiny>
          <ul>
            <li>{t("Minimum 8 characters long - the more, the better")}</li>
            <li>{t("At least one lowercase character")}</li>
            <li>{t("At least one uppercase character")}</li>
            <li>{t("At least one number, symbol, or whitespace character")}</li>
          </ul>
        </Box>

        <Button variant="contained" onClick={handleSubmit}>{t("Save Changes")}</Button>
      </Box>
    </form>
  </Card>;
};

export default Password;