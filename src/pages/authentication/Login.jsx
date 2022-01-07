import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, Divider, FormControlLabel, FormHelperText, Switch } from "@mui/material";
import { SocialIconButton, TextFieldWrapper } from "components/authentication/StyledComponents";
import FlexBox from "components/FlexBox";
import LightTextField from "components/LightTextField";
import { H1, H3, Paragraph, Small } from "components/Typography";
import { useFormik } from "formik";
import useAuth from "hooks/useAuth";
import FacebookIcon from "icons/FacebookIcon";
import GoogleIcon from "icons/GoogleIcon";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";


const Login = () => {
  const { t } = useTranslation()
  const {
    login,
    // loginWithFacebook,
    // loginWithGoogle
  } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const initialValues = {
    email: "ricardo@amiba.pt", password: "1", submit: null, remember: true
  }; // form field value validation schema

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
    password: Yup.string()//.min(6, "Password should be of minimum 6 characters length")
      .required("Password is required")
  });
  const { errors, values, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues, validationSchema,
    onSubmit: values => {
      setLoading(true);
      login(values.email, values.password).then((data) => {
        if (data.error || data.data.error) {
          setError(data.error || data.data.error);
          setLoading(false);
          return
        }

        setLoading(false);
        toast.success(t("You Logged In Successfully"));
        navigate("/");
      }).catch(error => {
        setError(error.message);
        setLoading(false);
      });
    }
  });
  return <FlexBox sx={{ alignItems: "center", flexDirection: "column", justifyContent: "center", height: { sm: "100%" } }}>
    <Card sx={{ padding: 4, maxWidth: 600, boxShadow: 1 }}>
      <FlexBox alignItems="center" flexDirection="column" justifyContent="center" mb={5}>
        <Box width={38} mb={1}>
          <img src="/static/logo/logo.svg" width="100%" alt="Amiba Logo" />
        </Box>
        <H1 fontSize={24} fontWeight={700}>
          {t("Sign In to Amiba")}
        </H1>
      </FlexBox>

      <FlexBox justifyContent="space-between" flexWrap="wrap" my="1rem">
        <SocialIconButton disabled //onClick={loginWithGoogle} 
          startIcon={<GoogleIcon sx={{ mr: 1 }} />}>
          {t("Sign in with Google")}
        </SocialIconButton>
        <SocialIconButton disabled //onClick={loginWithFacebook} 
          startIcon={<FacebookIcon sx={{ mr: 1 }} />}>
          {t("Sign in with Facebook")}
        </SocialIconButton>

        <Divider sx={{ my: 3, width: "100%", alignItems: "flex-start" }}>
          <H3 color="text.disabled" px={1}>
            {t("Or")}
          </H3>
        </Divider>

        <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FlexBox justifyContent="space-between" flexWrap="wrap">
            <TextFieldWrapper>
              <Paragraph fontWeight={600} mb={1}>
                {t("Email")}
              </Paragraph>
              <LightTextField fullWidth name="email" type="email" onBlur={handleBlur} onChange={handleChange} value={values.email || ""} error={Boolean(touched.email && errors.email)} helperText={touched.email && errors.email} />
            </TextFieldWrapper>

            <TextFieldWrapper>
              <Paragraph fontWeight={600} mb={1}>
                {t("Password")}
              </Paragraph>
              <LightTextField fullWidth name="password" type="password" onBlur={handleBlur} onChange={handleChange} value={values.password || ""} error={Boolean(touched.password && errors.password)} helperText={touched.password && errors.password} />
            </TextFieldWrapper>
          </FlexBox>

          <FlexBox mt={2} alignItems="center" justifyContent="space-between">
            <FormControlLabel control={<Switch name="remember" checked={values.remember} onChange={handleChange} />} label="Remember Me" sx={{ "& .MuiTypography-root": { fontWeight: 600 } }} />
            <Link to="/forget-password">
              <Small color="secondary.red">{t("Forgot Password?")}</Small>
            </Link>
          </FlexBox>

          {error && <FormHelperText error sx={{ mt: 2, fontSize: 13, fontWeight: 500, textAlign: "center" }}>
            {error}
          </FormHelperText>}

          <Box sx={{ mt: 4 }}>
            {loading ? <LoadingButton loading fullWidth variant="contained">
              {t("Sign In")}
            </LoadingButton> : <Button fullWidth type="submit" variant="contained">
              {t("Sign In")}
            </Button>}
          </Box>
        </form>

        <Small margin="auto" mt={3} color="text.disabled">
          {t("Don't have an account?")}{" "}
          <Link to="/register">
            <Small color="primary.main">{t("Create an account")}</Small>
          </Link>
        </Small>
      </FlexBox>
    </Card>
  </FlexBox>;
};

export default Login;