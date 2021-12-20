import { Box, Button, Card, LinearProgress, FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import LightTextField from "components/LightTextField";
import { H5, H6, Tiny } from "components/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { updatePassword } from "lib/requests/usersRequests";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";



const Password = () => {

  const initialValues = {
    oldPassword: "",
    password: "",
    password2: "",
    submit: null,
    remember: true
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string().min(6, "Password should be of minimum 6 characters length").required("Password is required"),
    newPassword2: Yup.string().min(6, "Password should be of minimum 6 characters length").required("Password is required")
      .oneOf([Yup.ref('newPassword'), null], "Passwords don't match!")
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      updatePassword(values.oldPassword, values.newPassword)
        .then(response => {
          if (response.error || response.data.error) {
            toast.error("Error Changing Password");
          } else {
            toast.success("Password Changed Successfully");
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  });

  const { t } = useTranslation();

  return <Card sx={{ padding: 3, pb: 5, "& li": { fontSize: 10, fontWeight: 500, color: "text.disabled" } }}>
    <H5>{t("Change Your Password")}</H5>

    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Box maxWidth={350}>
        {/* <LightTextField fullWidth sx={{ mt: 2 }} type="password"
          name="oldPassword" value={data.oldPassword} onChange={handleChange} placeholder="Enter current password" /> */}
        <LightTextField fullWidth sx={{ mt: 2 }} name="oldPassword" type="password"
          onBlur={handleBlur} onChange={handleChange} value={values.oldPassword || ""}
          error={Boolean(touched.oldPassword && errors.oldPassword)} helperText={touched.oldPassword && errors.oldPassword} placeholder="Enter current password" />
        <LightTextField fullWidth sx={{ mt: 2 }} name="newPassword" type="password"
          onBlur={handleBlur} onChange={handleChange} value={values.newPassword || ""}
          error={Boolean(touched.newPassword && errors.newPassword)} helperText={touched.newPassword && errors.newPassword} placeholder="Enter new password" />
        <LightTextField fullWidth sx={{ mt: 2 }} name="newPassword2" type="password"
          onBlur={handleBlur} onChange={handleChange} value={values.newPassword2 || ""}
          error={Boolean(touched.newPassword2 && errors.newPassword2)} helperText={touched.newPassword2 && errors.newPassword2} placeholder="Confirm new password" />
        {/* 
      <LightTextField fullWidth sx={{ mt: 2, mb: 1 }} type="password"
        name="newPassword" value={data.newPassword} onChange={handleChange} placeholder="Enter new password" />
      <LinearProgress variant="determinate" value={10} />
      <LightTextField fullWidth sx={{ mt: 2 }} type="password"
        name="newPassword2" value={data.newPassword2} onChange={handleChange} placeholder="Confirm new password" /> */}

        <Box my={3}>
          <H6>{t("Password requirements:")}</H6>
          <Tiny fontWeight={500} color="text.disabled">
            Ensure that these requirements are met:
          </Tiny>
          <ul>
            <li>Minimum 8 characters long - the more, the better</li>
            <li>At least one lowercase character</li>
            <li>At least one uppercase character</li>
            <li>At least one number, symbol, or whitespace character</li>
          </ul>
        </Box>

        <Button variant="contained" onClick={handleSubmit}>{t("Save Changes")}</Button>
      </Box>
    </form>
  </Card>;
};

export default Password;