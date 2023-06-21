import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import OfferForm from './OfferForm';
import { connect } from 'react-redux';
import { createOffer, getOfferByID, updateOffer } from 'store/actions/offerActions';
import { useParams } from 'react-router';
import Loading from 'layout/loader/Loading';

const OfferDetailsMain = ({ getOfferDetails, selectedOffer, loading, updateOfferDetails }) => {
    const { id } = useParams();

    const [readOnly, setReadOnly] = useState(true);
    const [offerDetails, setOfferDetails] = useState({
        title: '',
        image: {
            key: '',
            url: ''
        },
        validTill: Date.now(),
        offerType: '',
        discountValue: ''
    });

    useEffect(() => {
        getOfferDetails(id);
    }, [getOfferDetails, id]);

    useEffect(() => {
        if (selectedOffer) setOfferDetails(selectedOffer);
    }, [selectedOffer]);

    return (
        <MainCard
            title="Offert Details"
            contentSX={{ padding: 0 }}
            btnText={readOnly ? 'Edit' : 'Save'}
            btnEvent={() => {
                setReadOnly(false);
                if (!readOnly) {
                    const btn = document.getElementById('customerSubmit');
                    if (btn) btn.click();
                }
            }}
        >
            {loading ? (
                <Loading />
            ) : (
                <OfferForm
                    add
                    offerDetails={offerDetails}
                    setOfferDetails={setOfferDetails}
                    saveOffer={updateOfferDetails}
                    readOnly={readOnly}
                    setReadOnly={setReadOnly}
                />
            )}
        </MainCard>
    );
};

const mapStateToProps = ({ offer }) => {
    const { loading, offers, selectedOffer } = offer;

    return { loading, offers, selectedOffer };
};
const mapDispatchToProps = (dispatch) => ({
    getOfferDetails: (_id) => dispatch(getOfferByID(_id)),
    updateOfferDetails: (offerData, naviate) => dispatch(updateOffer(offerData, naviate))
});

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetailsMain);
