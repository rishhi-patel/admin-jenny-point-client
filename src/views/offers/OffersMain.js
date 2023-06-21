import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Box } from '@mui/system';
import { Button, Grid } from '@mui/material';
import { connect } from 'react-redux';
import { changeOfferSelection, changeModalState, createOffer, deleteOffer, getOffers, updateOffer } from 'store/actions/offerActions';
import { useEffect } from 'react';
import Loading from 'layout/loader/Loading';
import OfferCard from './OfferCard';
import { useNavigate } from 'react-router';
// import CreateOfferModal from './CreateOfferModal';

const OffersMain = ({ loading, offers, fetchOffers, updateSelectedOffer, deleteOfferById }) => {
    const navigate = useNavigate();

    useEffect(() => {
        fetchOffers();
    }, [fetchOffers]);

    return (
        <MainCard title="Offers" btnText="+ Add Offer" btnEvent={() => navigate('new')} sx={{ minHeight: '82vh' }}>
            {loading ? (
                <Loading />
            ) : (
                <Grid container spacing={4}>
                    {offers.map((offer) => (
                        <Grid item md={6} sm={6} xs={12} key={offer._id}>
                            <OfferCard offer={offer} updateSelectedOffer={updateSelectedOffer} deleteOfferById={deleteOfferById} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </MainCard>
    );
};

const mapStateToProps = ({ offer }) => {
    const { loading, offers } = offer;
    return { loading, offers };
};
const mapDispatchToProps = (dispatch) => ({
    fetchOffers: () => dispatch(getOffers()),
    deleteOfferById: (_id) => dispatch(deleteOffer(_id))
    // createNewOffer: (data) => dispatch(createOffer(data)),
    // updateModalState: (status) => dispatch(changeModalState(status)),
    // updateSelectedOffer: (offer) => dispatch(changeOfferSelection(offer)),
    // updateOfferDetails: (data, _id) => dispatch(updateOffer(data, _id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OffersMain);
