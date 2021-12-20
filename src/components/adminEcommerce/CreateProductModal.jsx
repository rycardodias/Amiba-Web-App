import { Add } from "@mui/icons-material";
import { Button, Card, Grid, IconButton, Modal, styled, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import DarkTextField from "components/DarkTextField";
import FlexBox from "components/FlexBox";
import { H2, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import DeleteIcon from "icons/DeleteIcon";
import ScrollBar from "simplebar-react";
import * as Yup from "yup"; // component props interface

// styled components
export const StyledModalCard = styled(Card)(({
  theme
}) => ({
  top: "50%",
  left: "50%",
  maxWidth: 700,
  minWidth: 300,
  position: "absolute",
  padding: "1.5rem",
  boxShadow: theme.shadows[2],
  transform: "translate(-50%, -50%)",
  width: "100%",
  outline: "none"
}));
const ImageDeleteWrapper = styled(Box)(({
  theme
}) => ({
  width: 25,
  height: 25,
  position: "absolute",
  top: 5,
  right: 5,
  backgroundColor: theme.palette.error.main,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));
const ImageUploadWrapper = styled(Box)(({
  theme
}) => ({
  backgroundColor: theme.palette.text.secondary,
  minHeight: 140,
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer"
}));

const CreateProductModal = ({
  open,
  data,
  onClose,
  editProduct
}) => {
  const downXl = useMediaQuery(theme => theme.breakpoints.down("xl")); // console.log(open, data, editProduct);

  const initialValues = {
    productName: "",
    storeName: "",
    price: "",
    discountPrice: "",
    description: "",
    category: "",
    tags: "",
    stock: "",
    sku: "",
    images: ""
  };
  const validationSchema = Yup.object().shape({
    productName: Yup.string().min(3, "Too Short").required("Product Name is Required!"),
    storeName: Yup.string().required("Store Name is Required!"),
    price: Yup.number().required("Price is Required!"),
    description: Yup.string().required("Description is Required!"),
    category: Yup.string().required("Category is Required!"),
    stock: Yup.number().required("Stock is Required!"),
    sku: Yup.string().required("SKU is Required!")
  });
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      console.log(values);
    }
  });
  return <Modal open={open} onClose={onClose}>
      <StyledModalCard>
        <H2 marginBottom={2}>
          {editProduct && data ? "Edit Product" : "Add new product"}
        </H2>
        <form onSubmit={handleSubmit}>
          <ScrollBar style={{
          maxHeight: downXl ? 500 : "auto"
        }}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <H6 mb={1}>Product Name</H6>
                <DarkTextField name="productName" placeholder="Enter product name" value={values.productName} onChange={handleChange} error={Boolean(touched.productName && errors.productName)} helperText={touched.productName && errors.productName} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <H6 mb={1}>Store Name</H6>
                <DarkTextField name="storeName" placeholder="Enter store name" value={values.storeName} onChange={handleChange} error={Boolean(touched.storeName && errors.storeName)} helperText={touched.storeName && errors.storeName} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <H6 mb={1}>Price</H6>
                <DarkTextField name="price" type="number" placeholder="Price" value={values.price} onChange={handleChange} error={Boolean(touched.price && errors.price)} helperText={touched.price && errors.price} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <H6 mb={1}>Discount Price</H6>
                <DarkTextField type="number" name="discountPrice" placeholder="Discount price" value={values.discountPrice} onChange={handleChange} error={Boolean(touched.discountPrice && errors.discountPrice)} helperText={touched.discountPrice && errors.discountPrice} />
              </Grid>

              <Grid item xs={12}>
                <H6 mb={1}>Description</H6>
                <DarkTextField fullWidth multiline rows={3} name="description" placeholder="Write about product" value={values.description} onChange={handleChange} error={Boolean(touched.description && errors.description)} helperText={touched.description && errors.description} sx={{
                "& .MuiOutlinedInput-root": {
                  padding: 0
                },
                "& .MuiOutlinedInput-input": {
                  paddingY: 1
                }
              }} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <H6 mb={1}>Category</H6>
                <DarkTextField name="category" placeholder="Category" value={values.category} onChange={handleChange} error={Boolean(touched.category && errors.category)} helperText={touched.category && errors.category} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <H6 mb={1}>Tags</H6>
                <DarkTextField name="tags" placeholder="Add Tags" value={values.tags} onChange={handleChange} error={Boolean(touched.tags && errors.tags)} helperText={touched.tags && errors.tags} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <H6 mb={1}>Stock</H6>
                <DarkTextField placeholder="04" type="number" name="stock" value={values.stock} onChange={handleChange} error={Boolean(touched.stock && errors.stock)} helperText={touched.stock && errors.stock} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <H6 mb={1}>SKU</H6>
                <DarkTextField name="sku" placeholder="UY8076" value={values.sku} onChange={handleChange} error={Boolean(touched.sku && errors.sku)} helperText={touched.sku && errors.sku} />
              </Grid>

              <Grid item xs={12}>
                <H6 pb={1}>Product Image</H6>
                <Box sx={{
                backgroundColor: "secondary.200",
                border: "1px dashed",
                borderColor: "text.disabled",
                borderRadius: "8px",
                padding: 1
              }}>
                  <Grid container spacing={1}>
                    {images.map(item => <Grid item sm={3} xs={4} key={item}>
                        <Box sx={{
                      minHeight: 140,
                      borderRadius: "8px",
                      overflow: "hidden",
                      position: "relative"
                    }}>
                          <img src={item} width="100%" height="100%" alt="" />

                          <ImageDeleteWrapper>
                            <IconButton>
                              <DeleteIcon sx={{
                            fontSize: 12,
                            color: "white"
                          }} />
                            </IconButton>
                          </ImageDeleteWrapper>
                        </Box>
                      </Grid>)}

                    <Grid item sm={3} xs={4}>
                      <label htmlFor="image-upload">
                        <input type="file" accept="image/*" id="image-upload" style={{
                        display: "none"
                      }} />
                        <ImageUploadWrapper textAlign="center">
                          <Box>
                            <Add color="disabled" />
                            <Small fontWeight={600} display="block">
                              Choose a file
                            </Small>
                            <Small fontWeight={600} color="text.disabled">
                              or drag it here
                            </Small>
                          </Box>
                        </ImageUploadWrapper>
                      </label>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </ScrollBar>

          <Grid container>
            <Grid item xs={12}>
              <FlexBox justifyContent="flex-end" marginTop={2}>
                <Button fullWidth variant="outlined" onClick={onClose} sx={{
                fontSize: 12,
                width: 124,
                color: "text.disabled",
                borderColor: "text.disabled",
                marginRight: 2
              }}>
                  Cancel
                </Button>
                <Button fullWidth type="submit" variant="contained" sx={{
                width: 124,
                fontSize: 12
              }}>
                  Save
                </Button>
              </FlexBox>
            </Grid>
          </Grid>
        </form>
      </StyledModalCard>
    </Modal>;
};

const images = ["/static/products/watch.png", "/static/products/camera.png", "/static/products/headphone.png"];
export default CreateProductModal;