import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Box } from '@mui/system';
import BrandCard from './BrandCard';
import { Button, Grid } from '@mui/material';
import { connect } from 'react-redux';
import { changeBrandSelection, changeModalState, createBrand, deleteBrand, getBrands, updateBrand } from 'store/actions/brandActions';
import { useEffect } from 'react';
import Loading from 'layout/loader/Loading';
import CreateBrandModal from './CreateBrandModal';

const BrandMain = ({
    loading,
    brandList,
    fetchCategotires,
    createNewBrand,
    brandModalState,
    updateModalState,
    selectedBrand,
    updateSelectedBrand,
    updateBrandDetails,
    deleteBrandById
}) => {
    useEffect(() => {
        fetchCategotires();
    }, [fetchCategotires]);

    return (
        <MainCard title="Brands" btnText="+ Add Brand" btnEvent={() => updateModalState(true)} sx={{ minHeight: '82vh' }}>
            {loading ? (
                <Loading />
            ) : (
                <Grid container spacing={6}>
                    {brandList.map((brand) => (
                        <Grid item xl={3} lg={3} md={6} sm={6} xs={12} key={brand._id}>
                            <BrandCard brand={brand} updateSelectedBrand={updateSelectedBrand} deleteBrandById={deleteBrandById} />
                        </Grid>
                    ))}
                </Grid>
            )}
            <CreateBrandModal
                open={brandModalState}
                setOpen={updateModalState}
                saveBrand={createNewBrand}
                selectedBrand={selectedBrand}
                updateBrandDetails={updateBrandDetails}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(BrandMain);
