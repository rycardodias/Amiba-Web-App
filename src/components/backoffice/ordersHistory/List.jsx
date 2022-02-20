import React, { useState, useEffect } from 'react'
import useTitle from "hooks/useTitle";
import { useTranslation } from "react-i18next";
import { Add, Edit, Delete } from "@mui/icons-material";
import { Box, Button, Card, styled } from "@mui/material";
import { H6 } from "components/Typography";
import toast from "react-hot-toast";
import FlexBox from "components/FlexBox";
import DataTable from "components/backoffice/utils/DataTable";
import columnShape from "components/backoffice/ordersHistory/ColumnShape";
import AddModal from "components/backoffice/ordersHistory/AddModal";
import * as orderHistoryRequests from 'lib/requests/orderHistoryRequests'
import { ButtonWrapper } from '../styledComponents/ButtonWrapper';

export const List = () => {
    const { t } = useTranslation();
    const tableName = t('Orders History')
    const tableSingleName = t('Order History')
    useTitle(tableName);

    const [tableData, setTableData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [clearFilter, setClearFilter] = useState("");
    const [hasFilter, setHasFilter] = useState("");
    const [openModal, setOpenModal] = useState(false);

    function getInitialData() {
        orderHistoryRequests.getOrderHistoryUserId()
            .then(response => {
                if (response.error || response.data.error) return setTableData([])
                setTableData(response.data.data)
            })
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
            const res = await orderHistoryRequests.deleteOrderHistory(id)
            if (res.error || res.data.error) {
                toast.error(`${t('Error removing')} ${tableSingleName}`);
            } else {
                toast.success(`${t('Success removing')} ${tableSingleName}`)
            }
        }
        await getInitialData()
    };


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

            {openModal && <AddModal open={openModal}
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
