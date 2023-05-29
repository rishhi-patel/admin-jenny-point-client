import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import OfferForm from './OfferForm';
import { connect } from 'react-redux';
import { createOffer } from 'store/actions/offerActions';

const AddOffer = ({ createNewOffer }) => {
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
    return (
        <MainCard
            title="Create Offert"
            contentSX={{ padding: 0 }}
            btnText={'Save'}
            btnEvent={() => {
                const btn = document.getElementById('customerSubmit');
                if (btn) btn.click();
            }}
        >
            <OfferForm add offerDetails={offerDetails} setOfferDetails={setOfferDetails} saveOffer={createNewOffer} />
        </MainCard>
    );
};

const mapStateToProps = ({ offer }) => {
    const { loading, offers } = offer;

    return { loading, offers };
};
const mapDispatchToProps = (dispatch) => ({
    createNewOffer: (data, navigate) => dispatch(createOffer(data, navigate))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddOffer);
