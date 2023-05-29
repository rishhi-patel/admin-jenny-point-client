import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import OfferForm from './OfferForm';

const AddOffer = () => {
    const [readOnly, setReadOnly] = useState(true);
    const [offerDetails, setOfferDetails] = useState({
        title: '',
        image: {
            key: '',
            url: ''
        },
        validTill: '',
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
            <OfferForm add userDetails={offerDetails} readOnly={readOnly} setReadOnly={setReadOnly} updateCandidate />
        </MainCard>
    );
};

export default AddOffer;
