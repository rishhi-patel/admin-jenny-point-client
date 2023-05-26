import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Box } from '@mui/system';
import { Button, Grid } from '@mui/material';
import { connect } from 'react-redux';
import { changeBrandSelection, changeModalState, createBrand, deleteBrand, getBrands, updateBrand } from 'store/actions/brandActions';
import { useEffect } from 'react';
import Loading from 'layout/loader/Loading';
import OfferCard from './OfferCard';
// import CreateBrandModal from './CreateBrandModal';

const OffersMain = ({ loading, brandList, fetchCategotires, updateModalState, updateSelectedBrand, deleteBrandById }) => {
    useEffect(() => {
        fetchCategotires();
    }, [fetchCategotires]);

    return (
        <MainCard title="Offers" btnText="+ Add Offer" btnEvent={() => updateModalState(true)} sx={{ minHeight: '82vh' }}>
            {loading ? (
                <Loading />
            ) : (
                <Grid container spacing={6}>
                    {brandList.map((brand) => (
                        <Grid item xl={3} lg={3} md={6} sm={6} xs={12} key={brand._id}>
                            <OfferCard brand={brand} updateSelectedBrand={updateSelectedBrand} deleteBrandById={deleteBrandById} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </MainCard>
    );
};

const mapStateToProps = ({ brands }) => {
    const { loading, brands: brandList, brandModalState, selectedBrand } = brands;

    return { loading, brandList, brandModalState, selectedBrand };
};
const mapDispatchToProps = (dispatch) => ({
    fetchCategotires: () => dispatch(getBrands()),
    createNewBrand: (data) => dispatch(createBrand(data)),
    updateModalState: (status) => dispatch(changeModalState(status)),
    updateSelectedBrand: (brand) => dispatch(changeBrandSelection(brand)),
    updateBrandDetails: (data, _id) => dispatch(updateBrand(data, _id)),
    deleteBrandById: (_id) => dispatch(deleteBrand(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(OffersMain);
