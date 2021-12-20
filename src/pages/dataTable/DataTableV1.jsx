import { ControlPoint } from "@mui/icons-material";
import { TabContext, TabList } from "@mui/lab";
import { Box, Button, Card, Grid, styled, Tab } from "@mui/material";
import AddEmployeeModal from "components/dataTable/dataTableV1/AddEmployeeModal";
import DataTable from "components/dataTable/dataTableV1/DataTable";
import FlexBox from "components/FlexBox";
import { H5 } from "components/Typography";
import useTitle from "hooks/useTitle";
import PeopleIcon from "icons/PeopleIcon";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "../../utils/axios"; // styled components

const Wrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  padding: "0 1.5rem",
  paddingTop: "1rem"
}));
const IconWrapper = styled(Box)(({
  theme
}) => ({
  backgroundColor: theme.palette.primary.light,
  width: 40,
  height: 40,
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "0.5rem"
}));
const TabListWrapper = styled(TabList)(({
  theme
}) => ({
  [theme.breakpoints.down(700)]: {
    order: 3,
    marginTop: 1
  }
}));

const DataTableV1 = () => {
  // change navbar title
  useTitle("Data Table V1");
  const {
    t
  } = useTranslation();
  const [value, setValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios.get("/api/tableData1/all").then(({
      data
    }) => {
      setTableData(data);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const handleDelete = async ids => {
    const {
      data
    } = await axios.post("/api/tableData1/delete", {
      ids
    });
    setTableData(data);
  };

  const filterTable = tableData.filter(item => value !== "" ? item.role.toLowerCase() === value : item.role);
  return <Box pt={2} pb={4}>
      <Card sx={{
      boxShadow: 4
    }}>
        <Grid container>
          <Grid item xs={12}>
            <Wrapper>
              <FlexBox alignItems="center">
                <IconWrapper>
                  <PeopleIcon sx={{
                  color: "primary.main"
                }} />
                </IconWrapper>
                <H5>{t("Users")}</H5>
              </FlexBox>

              <TabContext value={value}>
                <TabListWrapper variant="scrollable" onChange={handleChange}>
                  <Tab disableRipple label={t("All Users")} value="" />
                  <Tab disableRipple label={t("Editor")} value="editor" />
                  <Tab disableRipple label={t("Contributor")} value="contributor" />
                  <Tab disableRipple label={t("Administrator")} value="administrator" />
                  <Tab disableRipple label={t("Subscriber")} value="subscriber" />
                </TabListWrapper>
              </TabContext>

              <Button variant="contained" onClick={() => setOpenModal(true)} startIcon={<ControlPoint sx={{
              color: "text.secondary"
            }} />} sx={{
              fontSize: 12,
              boxShadow: 3
            }}>
                {t("Add New User")}
              </Button>
            </Wrapper>

            <AddEmployeeModal open={openModal} onClose={() => setOpenModal(false)} />

            {
            /*  Data Table */
          }
            <DataTable data={filterTable} handleDelete={handleDelete} />
          </Grid>
        </Grid>
      </Card>
    </Box>;
};

export default DataTableV1;