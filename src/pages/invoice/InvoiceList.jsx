import { Button, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import CustomTable from "components/adminEcommerce/CustomTable";
import FlexBox from "components/FlexBox";
import InvoiceColumnShape from "components/invoice/columnShape";
import { invoiceFakeData } from "components/invoice/fakeData";
import SearchInput from "components/SearchInput";
import useTitle from "hooks/useTitle";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const InvoiceList = () => {
  // change navbar title
  useTitle("Invoice List");
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    t
  } = useTranslation();

  const handleRowClick = rowData => () => {
    navigate("/dashboard/invoice-details", {
      state: rowData
    });
  };

  return <Box pt={2} pb={4}>
      <FlexBox justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <SearchInput placeholder="Find Invoice" />
        <Button variant="contained" onClick={() => navigate("/dashboard/add-invoice")} sx={{
        [theme.breakpoints.down(500)]: {
          width: "100%",
          mt: 1
        }
      }}>
          {t("Add New")}
        </Button>
      </FlexBox>

      <Box mt={2}>
        <CustomTable showFooter hidePagination columnShape={InvoiceColumnShape} data={invoiceFakeData} rowClick={handleRowClick} />
      </Box>
    </Box>;
};

export default InvoiceList;