import { Add } from "@mui/icons-material";
import { Box, Button, Card, styled } from "@mui/material";
import AddEmployeeModal from "components/dataTable/dataTableV2/AddEmployeeModal";
import DataTable from "components/dataTable/dataTableV2/DataTable";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import { H6 } from "components/Typography";
import useTitle from "hooks/useTitle";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "utils/axios"; // styled components

const ButtonWrapper = styled(FlexBox)(({
  theme
}) => ({
  [theme.breakpoints.down(500)]: {
    marginTop: 10,
    width: "100%",
    flexDirection: "column-reverse",
    "& > .MuiBox-root": {
      width: "100%",
      margin: "10px 0",
      alignItems: "center",
      flexDirection: "column"
    },
    "& .MuiButton-root": {
      minWidth: "100%"
    }
  }
}));

const DataTableV2 = () => {
  // change navbar title
  useTitle("Data Table V2");
  const {
    t
  } = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [hasFilter, setHasFilter] = useState("");
  const [clearFilter, setClearFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleRowSelect = rowArr => setSelectedRows(rowArr);

  const handleClearFilter = () => {
    setClearFilter("...");
    setTimeout(() => {
      setClearFilter("");
    }, 50);
  };

  useEffect(() => {
    axios.get("/api/tableData2/all").then(({
      data
    }) => setTableData(data)).catch(error => console.log(error));
  }, []);
  const ids = selectedRows.map(item => item.original.id);

  const handleDelete = async () => {
    const {
      data
    } = await axios.post("/api/tableData2/delete", {
      ids
    });
    setTableData(data);
  };

  return <Box pt={2} pb={4}>
      <FlexBox flexWrap="wrap" alignItems="center" justifyContent="space-between">
        <SearchInput placeholder="Find Friends" />

        <ButtonWrapper alignItems="center">
          {selectedRows.length > 0 && <FlexBox alignItems="center" mr={2}>
              <H6 mr={1}>{selectedRows.length} Selected</H6>
              <Button size="small" color="error" variant="contained" onClick={handleDelete} sx={{
            color: "common.white"
          }}>
                Delete Selected
              </Button>
            </FlexBox>}

          {!!hasFilter && <FlexBox alignItems="center" mr={2}>
              <Button size="small" color="error" variant="contained" sx={{
            color: "common.white"
          }} onClick={handleClearFilter}>
                Clear filter
              </Button>
            </FlexBox>}

          <Button variant="contained" size="small" endIcon={<Add />} onClick={() => setOpenModal(true)}>
            {t("Add Employee")}
          </Button>
        </ButtonWrapper>
      </FlexBox>

      <AddEmployeeModal open={openModal} onClose={() => setOpenModal(false)} />

      <Card sx={{
      marginTop: 3
    }}>
        <DataTable data={tableData} clearFilter={clearFilter} handleRowSelect={handleRowSelect} onFilterChange={filters => setHasFilter(filters.length)} />
      </Card>
    </Box>;
};

export default DataTableV2;