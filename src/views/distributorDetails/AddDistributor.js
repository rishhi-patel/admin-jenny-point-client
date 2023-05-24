/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { updateCandidateDetails } from 'store/actions/userActions';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from 'layout/loader/Loading';
import SettingsCard from 'views/customerDetails/SettingsCard';

const AddDistributor = ({ selectedCandidate, loading, updateCandidate }) => {
    const [readOnly, setReadOnly] = useState(true);

    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        isBlocked: false,
        phoneNo: '',
        address: ''
    });

    useEffect(() => {
        setUserDetails(selectedCandidate);
    }, [selectedCandidate]);

    return (
        <MainCard
            title="Distributor Details"
            contentSX={{ padding: 0 }}
            btnText={readOnly ? 'Edit' : 'Save'}
            btnEvent={() => {
                setReadOnly(false);
                if (!readOnly) {
                    const btn = document.getElementById('customerSubmit');
                    if (btn) btn.click();
                }
            }}
            cancelBtn={!readOnly}
            cancelBtnEvent={() => {
                setReadOnly(!readOnly);
                setUserDetails(selectedCandidate);
            }}
        >
            {loading ? (
                <Loading />
            ) : (
                <SettingsCard
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                    readOnly={readOnly}
                    setReadOnly={setReadOnly}
                    updateCandidate={updateCandidate}
                />
            )}
        </MainCard>
    );
};

const mapStateToProps = ({ user }) => {
    const { selectedCandidate, loading } = user;
    return { selectedCandidate, loading };
};
const mapDispatchToProps = (dispatch) => ({
    updateCandidate: (_id, DistributorDetails, navigate) => dispatch(updateCandidateDetails(_id, DistributorDetails, navigate))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDistributor);
