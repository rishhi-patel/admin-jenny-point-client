/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { adduser, updateCandidateDetails } from 'store/actions/userActions';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from 'layout/loader/Loading';
import SettingsCard from 'views/customerDetails/SettingsCard';
import { useNavigate } from 'react-router';
import DistributorForm from './DistributorForm';

const AddDistributor = ({ selectedCandidate, loading, updateCandidate }) => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        isBlocked: false,
        mobileNo: '',
        address: '',
        gstNo: ''
    });

    return (
        <MainCard
            title="Distributor Details"
            contentSX={{ padding: 0 }}
            btnText={'Save'}
            btnEvent={() => {
                const btn = document.getElementById('customerSubmit');
                if (btn) btn.click();
            }}
            cancelBtn
            cancelBtnEvent={() => navigate(-1)}
        >
            {loading ? (
                <Loading />
            ) : (
                <DistributorForm userDetails={userDetails} setUserDetails={setUserDetails} updateCandidate={updateCandidate} add />
            )}
        </MainCard>
    );
};

const mapStateToProps = ({ user }) => {
    const { selectedCandidate, loading } = user;
    return { selectedCandidate, loading };
};
const mapDispatchToProps = (dispatch) => ({
    updateCandidate: (DistributorDetails, navigate) => dispatch(adduser({ ...DistributorDetails, userType: 'distributor' }, navigate))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDistributor);
