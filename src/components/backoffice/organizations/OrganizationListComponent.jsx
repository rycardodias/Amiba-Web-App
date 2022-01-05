import React, { useState, useEffect } from 'react'
import useTitle from "hooks/useTitle";
import { useTranslation } from "react-i18next";
import { Add, Edit, Delete } from "@mui/icons-material";
import { Box, Button, Card, styled } from "@mui/material";
import { H6 } from "components/Typography";
import FlexBox from "components/FlexBox";
import toast from "react-hot-toast";

import DataTable from "components/backoffice/utils/DataTable";
import columnShape from "components/backoffice/organizations/OrganizationColumnShape";
import AddOrganizationsModal from "components/backoffice/organizations/AddOrganizationsModal";
import * as organizationsRequests from 'lib/requests/organizationsRequests'

export const OrganizationListComponent = () => {
    const { t } = useTranslation();
    const tableName = t('Organizations')
    const tableSingleName = t('Organization')
    useTitle(tableName);

    const [tableData, setTableData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [clearFilter, setClearFilter] = useState("");
    const [hasFilter, setHasFilter] = useState("");
    const [openModal, setOpenModal] = useState(false);

    function getInitialData() {
        organizationsRequests.getOrganizations()
            .then(response => setTableData(response.data.data))
            .catch(error => console.error(error))
    }

    useEffect(() => {
        getInitialData()
    }, []);

    const handleClearFilter = () => {
        setClearFilter("...");
        setTimeout(() => {
            setClearFilter("");
        }, 50);
    };

    const handleDelete = async () => {
        const ids = selectedRows.map(item => item.original.id);
        for (let id of ids) {
            const res = await organizationsRequests.deleteOrganization(id)
            if (res.error || res.data.error) toast.error(`${t('Error removing')} ${tableSingleName}`);
        }
        await getInitialData()
    };

    const ButtonWrapper = styled(FlexBox)(({ theme }) => ({
        [theme.breakpoints.down(500)]: {
            marginTop: 10, width: "100%", flexDirection: "column-reverse",
            "& > .MuiBox-root": { width: "100%", margin: "10px 0", alignItems: "center", flexDirection: "column" }, "& .MuiButton-root": { minWidth: "100%" }
        }
    }));

    return (
        <Box pt={2} pb={4}>
            <FlexBox flexWrap="wrap" alignItems="center" justifyContent="space-between">
                {/* <SearchInput placeholder={`${t('Find')} ${tableSingleName}`} /> */}
                <div></div>

                <ButtonWrapper alignItems="center">
                    {!!hasFilter && <FlexBox alignItems="center" mr={2}>
                        <Button size="small" color="error" variant="contained" sx={{ color: "common.white" }} onClick={handleClearFilter}>
                            {t('Clear filter')}
                        </Button>
                    </FlexBox>}

                    {selectedRows.length > 0 &&
                        (selectedRows.length === 1 ? (
                            <FlexBox alignItems="center" mr={2}>
                                <H6 mr={1}>{selectedRows.length} {t('Selected')}</H6>
                                <Button size="small" color="error" variant="contained" endIcon={<Delete />} onClick={handleDelete} sx={{ color: "common.white" }}>
                                    {t('Delete Selected')}
                                </Button>
                            </FlexBox>)
                            : (
                                <>
                                    <H6 mr={1}>{selectedRows.length} {t('Selected')}</H6>
                                    <Button size="small" color="error" variant="contained" endIcon={<Delete />} onClick={handleDelete} sx={{ color: "common.white" }}>
                                        {t('Delete Selected')}
                                    </Button>
                                </>)
                        )
                    }

                    {(selectedRows.length === 1) &&
                        <Button size="small" color="warning" variant="contained" endIcon={<Edit />} onClick={() => setOpenModal(true)} sx={{ color: "common.white" }}>
                            {t('Edit Selected')}
                        </Button>
                    }
                    {(selectedRows.length === 0) && <Button variant="contained" size="small" endIcon={<Add />} onClick={() => setOpenModal(true)}>
                        {`${t('Add')} ${t(tableSingleName)}`}
                    </Button>
                    }

                </ButtonWrapper>
            </FlexBox >

            {openModal && <AddOrganizationsModal open={openModal}
                edit={selectedRows.length === 1}
                data={selectedRows.length === 1 && selectedRows[0].original}
                onClose={(newRecord) => { setOpenModal(false); newRecord === true && getInitialData() }}
            />}

            <Card sx={{ marginTop: 3 }}>
                <DataTable data={tableData}
                    columnShape={columnShape}
                    clearFilter={clearFilter}
                    handleRowSelect={(e) => setSelectedRows(e)}
                    onFilterChange={filters => setHasFilter(filters.length)}
                />
            </Card>
        </Box >
    )
}
