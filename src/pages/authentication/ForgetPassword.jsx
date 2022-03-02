import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, FormHelperText } from "@mui/material";
import FlexBox from "components/FlexBox";
import LightTextField from "components/LightTextField";
import { H1, Small } from "components/Typography";
import { useFormik } from "formik";
import { forgetPassword } from "lib/requests/usersRequests";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import * as Yup from "yup";


const ForgetPassword = () => {
  const { t } = useTranslation()
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
    submit: null
  }; // form field value validation schema

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t("Must be a valid email")).max(255).required(`${t('Email')} ${t('is required!')}`)
  });
  const { errors, values, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues, validationSchema, onSubmit: values => {
      setLoading(true);
      forgetPassword(values.email)
        .then(response => {
          if (response.error || response.data.error) return setError("Error!")
          return toast.success(t("Reset link has been sent!"));
        })
        .catch(error => {
          setError("Error!")
        })
      setLoading(false);
    }
  });
  return <FlexBox height="100vh" alignItems="center" flexDirection="column" justifyContent="center">
    <Card sx={{ padding: 4, maxWidth: 600, marginTop: 4, boxShadow: 1 }}>
      <FlexBox alignItems="center" flexDirection="column" justifyContent="center" mb={5}>
        <Box width={38} mb={1}>
          <img src="/static/logo/logo.svg" width="100%" alt="Amiba Logo" />
        </Box>
        <H1 fontSize={24} fontWeight={700}>
          {t("Reset your password")}
        </H1>
      </FlexBox>

      <FlexBox justifyContent="space-between" flexWrap="wrap" my={2}>
        <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
          <LightTextField fullWidth name="email" type="email" label={t("Email")} onBlur={handleBlur} onChange={handleChange} value={values.email || ""} error={Boolean(touched.email && errors.email)} helperText={touched.email && errors.email} />

          {error && <FormHelperText error sx={{ mt: 2, fontSize: 13, fontWeight: 500, textAlign: "center" }}>{error}</FormHelperText>}

          <Box sx={{ mt: 4 }}>
            {loading ? <LoadingButton loading fullWidth variant="contained">{t("Reset")}</LoadingButton> :
              <Button fullWidth type="submit" variant="contained">{t("Reset")}</Button>}
          </Box>
        </form>

        <Small margin="auto" mt={3} color="text.disabled">
          {t("Dont have an account?")}{" "}
          < Link to="/register" >
            <Small color="primary.main">{t("Create an account")}</Small>
          </Link>
        </Small>
      </FlexBox>
    </Card >
  </FlexBox >;
};

export default ForgetPassword;