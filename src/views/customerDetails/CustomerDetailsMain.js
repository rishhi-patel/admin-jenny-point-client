/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import SettingsCard from './SettingsCard';
import { useParams } from 'react-router';
import { getCandidateById, updateCandidateDetails } from 'store/actions/userActions';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from 'layout/loader/Loading';

const customerDetails = ({ getCandidateDetails, selectedCandidate, loading, updateCandidate }) => {
    const { id } = useParams();
    const [readOnly, setReadOnly] = useState(true);

    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        isBlocked: false,
        phoneNo: '',
        address: ''
    });

    useEffect(() => {
        getCandidateDetails(id);
    }, [getCandidateDetails, id]);

    useEffect(() => {
        setUserDetails(selectedCandidate);
    }, [selectedCandidate]);

    return (
        <MainCard
            title="Customer Details"
            contentSX={{ padding: 0 }}
            // btnText={readOnly ? 'Edit' : 'Save'}
            // btnEvent={() => {
            //     setReadOnly(false);
            //     if (!readOnly) {
            //         const btn = document.getElementById('customerSubmit');
            //         if (btn) btn.click();
            //     }
            // }}
            // cancelBtn={!readOnly}
            // cancelBtnEvent={() => {
            //     setReadOnly(!readOnly);
            //     setUserDetails(selectedCandidate);
            // }}
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
    getCandidateDetails: (id) => dispatch(getCandidateById(id)),
    updateCandidate: (_id, customerDetails, navigate) => dispatch(updateCandidateDetails(_id, customerDetails, navigate))
});

export default connect(mapStateToProps, mapDispatchToProps)(customerDetails);
