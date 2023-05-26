/* eslint-disable jsx-a11y/label-has-associated-control */
// IMPORTS
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { FormHelperText, Grid, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import CustomInput from 'views/customerDetails/CustomInput';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { UploadSingleImage } from 'utils/uploadSingleImage';

const offerTypes = [
    {
        value: 'flat',
        label: 'Flat'
    },
    {
        value: 'percentage',
        label: 'Percentage'
    }
];

export default function OfferForm({ userDetails, add, readOnly, setReadOnly, updateCandidate }) {
    const navigate = useNavigate();
    return (
        <Card variant="outlined" sx={{ height: '100%', width: '100%', padding: 0, border: 'none' }}>
            <Formik
                initialValues={{
                    ...userDetails
                }}
                enableReinitialize
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('Name Name is required'),
                    email: Yup.string().max(255).required('email Name is required'),
                    mobileNo: Yup.string().max(255).required('mobileNo Name is required'),
                    address: Yup.string().max(255).required('address Name is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (add) {
                            updateCandidate(values, navigate);
                        } else updateCandidate(userDetails._id, values, navigate);
                        setReadOnly(true);
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <CardContent
                            sx={{
                                p: 3,
                                // maxHeight: { md: '40vh' },
                                textAlign: { xs: 'center', md: 'start' }
                            }}
                        >
                            {/* FIELDS */}
                            <FormControl fullWidth>
                                <Grid container direction={{ xs: 'column', md: 'row' }} columnSpacing={5} rowSpacing={3}>
                                    <Grid xs={4} />
                                    <Grid component="form" item xs={4} sx={{ height: 200 }}>
                                        <UploadSingleImage imgData={{ key: '', url: '' }} updateImage={() => console.log('')} />
                                    </Grid>{' '}
                                    <Grid xs={4} />
                                    <Grid component="form" item xs={6}>
                                        {' '}
                                        <CustomInput
                                            id="title"
                                            name="title"
                                            value={values.title}
                                            title="Title"
                                            disabled={readOnly}
                                            error={touched.title && errors.title}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.title && errors.title && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.title}
                                            </FormHelperText>
                                        )}
                                    </Grid>{' '}
                                    <Grid component="form" item xs={6}>
                                        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Valid Upto</label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                sx={{ width: '100% !important', '&>div>input': { padding: '10px 14px' } }}
                                                onChange={(val) => console.log({ val: moment(val).format('Do MMMM YYYY ,  h:mm a') })}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomInput
                                            select
                                            type="offerType"
                                            id="offerType"
                                            name="offerType"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            disabled={readOnly}
                                            title="offerType"
                                            value={values.offerType}
                                            error={touched.offerType && errors.offerType}
                                            content={offerTypes.map((option) => (
                                                <MenuItem value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        />
                                        {touched.offerType && errors.offerType && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.offerType}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid component="form" item xs={6}>
                                        {' '}
                                        <CustomInput
                                            type="value"
                                            id="value"
                                            name="value"
                                            value={values.value}
                                            // onChange={changeField}
                                            title="Offer Value"
                                            disabled={readOnly}
                                            error={touched.value && errors.value}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.value && errors.value && (
                                            <FormHelperText error id="standard-weight-helper-text-value-login">
                                                {errors.value}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <button type="submit" id="customerSubmit" style={{ display: 'none', opacity: 0 }} />
                                </Grid>
                            </FormControl>
                        </CardContent>
                    </form>
                )}
            </Formik>
        </Card>
    );
}
