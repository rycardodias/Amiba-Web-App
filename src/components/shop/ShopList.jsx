import React from 'react'
import Heading from "components/shop/Heading";
import { StyledPagination } from 'components/backoffice/styledComponents/DataTableStyles'

import ProductCard from "components/shop/ProductCard";
import SearchFilter from "components/shop/SearchFilter";
import { Box, ButtonBase, Card, Grid, Stack, styled } from "@mui/material";
import { StyledModalCard } from 'components/backoffice/styledComponents/AddModalStyles'
import useTitle from "hooks/useTitle";
import { Dot, } from "pure-react-carousel";
import { useState, useEffect } from "react";
import * as productsRequests from 'lib/requests/productsRequests'
import { useTranslation } from "react-i18next";

import ShopItemModal from 'components/shop/ShopItemModal';

export const ShopList = () => {
    const { t } = useTranslation()
    useTitle(t("Shop"));
    const [openModal, setOpenModal] = useState(false);

    const [data, setdata] = useState([])
    const [itemModal, setItemModal] = useState([])

    const [filterCategory, setfilterCategory] = useState("")
    const [filterOrganization, setfilterOrganization] = useState("")
    const [filterSortBy, setfilterSortBy] = useState("")

    function handleFilterChange(type, value) {
        if (type === "CATEGORY") return setfilterCategory(value)
        if (type === "ORG") return setfilterOrganization(value)
        if (type === "SORTBY") return setfilterSortBy(value)
    }

    useEffect(() => {
        if (!(filterCategory || filterOrganization)) { //empty filters
            productsRequests.getProductsAllAvailable()
                .then(response => {
                    if (response.error || response.data.error) return setdata([])
                    setdata(response.data.data)
                })
                .catch(error => console.error(error))
        }
        else if (filterCategory && !filterOrganization) {
            productsRequests.getProductsAllAvailableType(filterCategory)
                .then(response => {
                    console.log(`response`, response)
                    if (response.error || response.data.error) return setdata([])
                    setdata(response.data.data)
                })
                .catch(error => console.error(error))
        }
        else if (!filterCategory && filterOrganization) {
            productsRequests.getProductsAllAvailableInOrganization([filterOrganization])
                .then(response => {
                    if (response.error || response.data.error) return setdata([])
                    setdata(response.data.data)
                })
                .catch(error => console.error(error))
        }
        else {
            productsRequests.getProductsAllAvailableTypeOrganization(filterCategory, filterOrganization)
                .then(response => {
                    if (response.error || response.data.error) return setdata([])
                    setdata(response.data.data)
                })
                .catch(error => console.error(error))
        }

    }, [filterOrganization,filterCategory ])

    return <Box pt={2} pb={4}>
        <Heading heading={t("Amiba Ecommerce")} />
        <Box marginTop={3}>
            <Grid container spacing={3}>
                <Grid item lg={3} sm={4} xs={12}>
                    <SearchFilter sortBy={filterSortBy} organization={filterOrganization} category={filterCategory} onFilterChange={handleFilterChange} />
                </Grid>

                <Grid item lg={9} sm={8} xs={12}>
                    <Card sx={{ padding: 3 }}>
                        <Grid container spacing={3}>
                            {data.map(item =>
                                <Grid item lg={4} md={6} xs={12} key={item.id}>
                                    <ProductCard product={item} handleClick={() => { setOpenModal(true); setItemModal(item) }} />
                                </Grid>
                            )}
                        </Grid>

                        <Stack alignItems="center" marginTop={4}>
                            <StyledPagination count={Math.ceil(data.length / 10)} shape="rounded" //   onChange={handleChange}
                            />
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </Box>

        {openModal && <ShopItemModal open={openModal} itemModal={itemModal} onModalClose={() => setOpenModal(false)} />}
    </Box>;
}
