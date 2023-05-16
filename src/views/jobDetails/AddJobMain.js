import React from 'react';
import JobDetailsForm from './JobDetailsForm';
import MainCard from 'ui-component/cards/MainCard';
import { createJob } from 'store/actions/jobActions';
import { connect } from 'react-redux';

const AddJobMain = ({ createNewJob }) => {
    return (
        <MainCard
            title="Create Job"
            btnText="+ Create"
            btnEvent={() => {
                const btn = document.getElementById('jobSubmit');
                if (btn) btn.click();
            }}
        >
            <JobDetailsForm
                saveJob={createNewJob}
                details={{
                    jobPosition: '',
                    jobDescription: '',
                    requirement: '',
                    industry: '',
                    shifts: '',
                    jobLocation: '',
                    salary: '',
                    aboutCompany: '',
                    empowering: '',
                    aboutCompany: '',
                    submit: null
                }}
            />
        </MainCard>
    );
};

const mapStateToProps = ({ jobs }) => {
    const { loading } = jobs;
    return { loading };
};
const mapDispatchToProps = (dispatch) => ({
    createNewJob: (data, navigate) => dispatch(createJob(data, navigate))
});
export default connect(mapStateToProps, mapDispatchToProps)(AddJobMain);
