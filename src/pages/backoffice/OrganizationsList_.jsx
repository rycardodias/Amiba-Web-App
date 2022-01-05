import { Add, Edit } from "@mui/icons-material";

import { Box, Button, Card, styled } from "@mui/material";
import AddOrganizationsModal from "components/backoffice/organizations/AddOrganizationsModal";
import DataTable from "components/backoffice/utils/DataTable";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import { H6 } from "components/Typography";
import useTitle from "hooks/useTitle";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as organizationsRequests from 'lib/requests/organizationsRequests'
import toast from "react-hot-toast";
import columnShape from "components/backoffice/organizations/OrganizationColumnShape";


const ButtonWrapper = styled(FlexBox)(({ theme }) => ({
  [theme.breakpoints.down(500)]: {
    marginTop: 10, width: "100%", flexDirection: "column-reverse",
    "& > .MuiBox-root": { width: "100%", margin: "10px 0", alignItems: "center", flexDirection: "column" }, "& .MuiButton-root": { minWidth: "100%" }
  }
}));

const OrganizationsList = () => {
  const { t } = useTranslation();
  const tableName = t('Organizations')
  const tableSingleName = t('Organization')
  // change navbar title
  useTitle(tableName);

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

  function getInitialData() {
    organizationsRequests.getOrganizations()
      .then(response => {
        setTableData(response.data.data)
      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    getInitialData()
  }, []);

  const ids = selectedRows.map(item => item.original.id);

  const handleDelete = async () => {
    for (let id of ids) {
      const res = await organizationsRequests.deleteOrganization(id)

      if (res.error || res.data.error) {
        toast.error(`${t('Error removing')} ${tableSingleName}`);
      }
    }
    await getInitialData()
  };

  return <Box pt={2} pb={4}>
    <FlexBox flexWrap="wrap" alignItems="center" justifyContent="space-between">
      <SearchInput placeholder={`${t('Find')} ${tableSingleName}`} />

      <ButtonWrapper alignItems="center">
        {selectedRows.length > 0 && <FlexBox alignItems="center" mr={2}>
          <H6 mr={1}>{selectedRows.length} {t('Selected')}</H6>
          <Button size="small" color="error" variant="contained" onClick={handleDelete} sx={{ color: "common.white" }}>

            {t('Delete Selected')}
          </Button>
        </FlexBox>}

        {!!hasFilter && <FlexBox alignItems="center" mr={2}>
          <Button size="small" color="error" variant="contained" sx={{ color: "common.white" }} onClick={handleClearFilter}>
            {t('Clear filter')}
          </Button>
        </FlexBox>}

        <Button variant="contained" size="small" endIcon={<Add />} onClick={() => setOpenModal(true)}>
          {`${t('Add')} ${t(tableSingleName)}`}
        </Button>
      </ButtonWrapper>
    </FlexBox>

    {/* <AddOrganizationsModal open={openModal} onClose={(newRecord) => { setOpenModal(false); newRecord === true && getInitialData() }} /> */}

    <Card sx={{ marginTop: 3 }}>
      <DataTable data={tableData} columnShape={columnShape} clearFilter={clearFilter} handleRowSelect={handleRowSelect} onFilterChange={filters => setHasFilter(filters.length)} />
    </Card>
  </Box>;
};

export default OrganizationsList;