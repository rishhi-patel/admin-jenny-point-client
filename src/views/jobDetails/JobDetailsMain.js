// IMPORTS
import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import JobDetailsForm from './JobDetailsForm';
import { deleteJobById, getJobById, updateJobById } from 'store/actions/jobActions';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Loading from 'layout/loader/Loading';

//APP
function JobDetailsMain({ getJobDetails, selectedJob, loading, updateJob, deleteJob }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [readOnly, setReadOnly] = useState(true);
    //
    useEffect(() => {
        getJobDetails(id);
    }, [getJobDetails]);

    //RETURN
    return (
        <MainCard
            title="Job Details"
            btnText={readOnly ? 'Edit' : 'Save'}
            btnEvent={() => {
                setReadOnly(false);
                if (!readOnly) {
                    const btn = document.getElementById('jobSubmit');
                    if (btn) btn.click();
                }
            }}
            dltBtn
            dltBtnEvent={() => deleteJob(id, navigate)}
        >
            {loading ? (
                <Loading />
            ) : (
                <JobDetailsForm
                    details={{
                        ...selectedJob
                    }}
                    saveJob={updateJob}
                    readOnly={readOnly}
                    setReadOnly={setReadOnly}
                />
            )}
        </MainCard>
    );
}
const mapStateToProps = ({ jobs }) => {
    const { selectedJob, loading } = jobs;
    return { selectedJob, loading };
};
const mapDispatchToProps = (dispatch) => ({
    getJobDetails: (_id) => dispatch(getJobById(_id)),
    updateJob: (data, navigate) => dispatch(updateJobById(data, navigate)),
    deleteJob: (_id, navigate) => dispatch(deleteJobById(_id, navigate))
});
export default connect(mapStateToProps, mapDispatchToProps)(JobDetailsMain);
