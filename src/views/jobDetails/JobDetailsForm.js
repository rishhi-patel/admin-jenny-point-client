import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import CardContent from '@mui/material/CardContent';
import { FormHelperText, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import CustomInput from 'views/customerDetails/CustomInput';
import MainCard from 'ui-component/cards/MainCard';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { getCategories } from 'store/actions/categoryActions';

const shifts = [
    {
        value: 'first',
        label: 'First'
    },
    {
        value: 'second',
        label: 'Second'
    },
    {
        value: 'night',
        label: 'night'
    }
];
const JobDetailsForm = ({ details, readOnly, saveJob, setReadOnly, fetchCategotires, industries }) => {
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategotires();
    }, [fetchCategotires]);

    return (
        <Formik
            initialValues={{
                ...details
            }}
            enableReinitialize
            validationSchema={Yup.object().shape({
                jobPosition: Yup.string().max(255).required('Job Position is required'),
                jobDescription: Yup.string().max(255).required('Job Description is required'),
                requirement: Yup.string().max(255).required('Requirement is required'),
                industry: Yup.string().max(255).required('Industry is required'),
                shifts: Yup.string().max(255).required('Shifts is required'),
                jobLocation: Yup.string().max(255).required('Job Location is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    saveJob(values, navigate);
                    if (setReadOnly) setReadOnly(true);
                } catch (err) {
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <CardContent
                        sx={{
                            p: 3,

                            textAlign: { xs: 'center', md: 'start' }
                        }}
                    >
                        <FormControl fullWidth>
                            <Grid container direction={{ xs: 'column', md: 'row' }} columnSpacing={5} rowSpacing={3}>
                                <Grid component="form" item xs={6}>
                                    <CustomInput
                                        id="Job position"
                                        name="jobPosition"
                                        error={touched.jobPosition && errors.jobPosition}
                                        value={values.jobPosition}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        disabled={readOnly}
                                        title="Job Position"
                                    />
                                    {touched.jobPosition && errors.jobPosition && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.jobPosition}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                {/* ROW 1: LAST NAME */}
                                <Grid component="form" item xs={6}>
                                    <CustomInput
                                        id="Job description"
                                        name="jobDescription"
                                        error={touched.jobDescription && errors.jobDescription}
                                        value={values.jobDescription}
                                        requirementrequirement
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        disabled={readOnly}
                                        title="Job description"
                                    />
                                    {touched.jobDescription && errors.jobDescription && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.jobDescription}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                {/* ROW 2: MIDDLE NAME */}
                                <Grid item xs={6}>
                                    <CustomInput
                                        id="Requirement"
                                        name="requirement"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        disabled={readOnly}
                                        value={values.requirement}
                                        error={touched.requirement && errors.requirement}
                                        title="Requirement"
                                    />
                                    {touched.requirement && errors.requirement && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.requirement}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                {/* ROW 3: PHONE */}
                                <Grid item xs={6}>
                                    <CustomInput
                                        select
                                        id="Industry"
                                        name="industry"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        disabled={readOnly}
                                        value={values.industry}
                                        error={touched.industry && errors.industry}
                                        title="Industry"
                                        content={industries.map((option) => (
                                            <MenuItem value={option.value}>{option.label}</MenuItem>
                                        ))}
                                    />
                                    {touched.industry && errors.industry && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.industry}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    <CustomInput
                                        id="JobLocation"
                                        name="jobLocation"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        disabled={readOnly}
                                        value={values.jobLocation}
                                        error={touched.jobLocation && errors.jobLocation}
                                        title="Job Location"
                                    />
                                    {touched.jobLocation && errors.jobLocation && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.jobLocation}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                {/* ROW 3: EMAIL */}
                                <Grid item xs={3}>
                                    <CustomInput
                                        type="minSalary"
                                        id="minSalary"
                                        name="minSalary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        disabled={readOnly}
                                        value={values.minSalary}
                                        error={touched.minSalary && errors.minSalary}
                                        title="Min. Salary"
                                    />
                                    {touched.minSalary && errors.minSalary && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.minSalary}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomInput
                                        type="maxSalary"
                                        id="maxSalary"
                                        name="maxSalary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        disabled={readOnly}
                                        value={values.maxSalary}
                                        error={touched.maxSalary && errors.maxSalary}
                                        title="Max. Salary"
                                    />
                                    {touched.maxSalary && errors.maxSalary && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.maxSalary}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    <CustomInput
                                        select
                                        type="Shifts"
                                        id="Shifts"
                                        name="shifts"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        disabled={readOnly}
                                        title="Shifts"
                                        value={values.shifts}
                                        error={touched.shifts && errors.shifts}
                                        content={shifts.map((option) => (
                                            <MenuItem value={option.value}>{option.label}</MenuItem>
                                        ))}
                                    />
                                    {touched.shifts && errors.shifts && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.shifts}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={6}></Grid>
                                <Grid item xs={6}>
                                    <CustomInput
                                        id="Empowering"
                                        name="empowering"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        disabled={readOnly}
                                        value={values.empowering}
                                        title="Empowering"
                                        multiline
                                        minRows={4}
                                    />{' '}
                                    {touched.empowering && errors.empowering && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.empowering}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    <CustomInput
                                        id="About Company"
                                        name="aboutCompany"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        disabled={readOnly}
                                        value={values.aboutCompany}
                                        title="About Company"
                                        multiline
                                        minRows={4}
                                    />
                                </Grid>{' '}
                                {/* BUTTON */}
                                <button type="submit" id="jobSubmit" style={{ display: 'none', opacity: 0 }} />
                            </Grid>
                        </FormControl>
                    </CardContent>
                </form>
            )}
        </Formik>
    );
};

const mapStateToProps = ({ categories }) => {
    const { categories: industries } = categories;
    return {
        industries: industries.map((elem) => {
            return {
                value: elem.name,
                label: elem.name
            };
        })
    };
};
const mapDispatchToProps = (dispatch) => ({
    fetchCategotires: () => dispatch(getCategories())
});
export default connect(mapStateToProps, mapDispatchToProps)(JobDetailsForm);
//
