import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import OfferForm from './OfferForm';

const AddOffer = () => {
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
            <OfferForm />
        </MainCard>
    );
};

export default AddOffer;
