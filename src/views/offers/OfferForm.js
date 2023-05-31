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
import dayjs from 'dayjs';

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

export default function OfferForm({ offerDetails, add, readOnly, setReadOnly, saveOffer, setOfferDetails }) {
    const { image } = offerDetails;
    const navigate = useNavigate();
    return (
        <Card variant="outlined" sx={{ height: '100%', width: '100%', padding: 0, border: 'none' }}>
            <Formik
                initialValues={{
                    ...offerDetails
                }}
                enableReinitialize
                validationSchema={Yup.object().shape({
                    title: Yup.string().max(255).required('offer title is required'),
                    offerType: Yup.string().max(255).required('offer type title is required'),
                    discountValue: Yup.string().max(255).required('offer value is required'),
                    image: Yup.object().shape({
                        key: Yup.string().required('image is required'),
                        url: Yup.string().required('image is required')
                    })
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        saveOffer(values, navigate);
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
                            <FormControl fullWidth>
                                <Grid container direction={{ xs: 'column', md: 'row' }} columnSpacing={5} rowSpacing={3}>
                                    <Grid xs={3} />
                                    <Grid item xs={6} sx={{ height: 300 }}>
                                        <UploadSingleImage
                                            imgData={image}
                                            error={errors.image}
                                            updateImage={setOfferDetails}
                                            disabled={readOnly}
                                        />
                                    </Grid>
                                    <Grid xs={3} />
                                    <Grid component="form" item xs={6}>
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
                                                id="validTill"
                                                name="validTill"
                                                onChange={(val) => {
                                                    setOfferDetails((oldVal) => {
                                                        return { ...oldVal, ...values, validTill: val };
                                                    });
                                                }}
                                                value={dayjs(values.validTill)}
                                                disabled={readOnly}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomInput
                                            select
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
                                        {/* )} */}
                                        {touched.offerType && errors.offerType && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.offerType}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid component="form" item xs={6}>
                                        <CustomInput
                                            id="value"
                                            name="discountValue"
                                            value={values.discountValue}
                                            title="Offer Value"
                                            disabled={readOnly}
                                            error={touched.discountValue && errors.discountValue}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.discountValue && errors.discountValue && (
                                            <FormHelperText error id="standard-weight-helper-text-discountValue-login">
                                                {errors.discountValue}
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
