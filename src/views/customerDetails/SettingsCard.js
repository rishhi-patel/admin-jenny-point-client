// IMPORTS
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import { FormHelperText, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomInput from './CustomInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
//APP
export default function SettingsCard({ userDetails, add, readOnly, setReadOnly, updateCandidate }) {
    //TAB STATES
    const navigate = useNavigate();
    const [value, setValue] = React.useState('one');
    const handleChange = (even, newValue) => {
        setValue(newValue);
    };

    // GENDER SELECT STATES

    // FORM STATES

    //BUTTON STATES
    const [edit, update] = useState({
        required: true,
        disabled: true,
        isEdit: true
    });

    // EDIT -> UPDATE

    // TOGGLE PASSWORD VISIBILITY

    //RETURN
    return (
        <Card variant="outlined" sx={{ height: '100%', width: '100%', padding: 0, border: 'none' }}>
            <Formik
                initialValues={{
                    ...userDetails
                }}
                enableReinitialize
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('Name Name is required'),
                    email: Yup.string()
                        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address')
                        .required('Email is required'),
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
                                    <Grid component="form" item xs={6}>
                                        <CustomInput
                                            id="name"
                                            name="name"
                                            value={values.name}
                                            title="Name"
                                            disabled={readOnly}
                                            error={touched.name && errors.name}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.name && errors.name && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.name}
                                            </FormHelperText>
                                        )}
                                        <CustomInput
                                            id="phone"
                                            name="mobileNo"
                                            value={values.mobileNo}
                                            // onChange={changeField}
                                            title="Phone No."
                                            disabled={readOnly}
                                            error={touched.mobileNo && errors.mobileNo}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.mobileNo && errors.mobileNo && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.mobileNo}
                                            </FormHelperText>
                                        )}
                                        <CustomInput
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={values.email}
                                            // onChange={changeField}
                                            title="Email Address"
                                            disabled={readOnly}
                                            error={touched.email && errors.email}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid item xs={6}>
                                        <CustomInput
                                            id="Address"
                                            name="address"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            disabled={readOnly}
                                            value={values.address}
                                            title="Address"
                                            multiline
                                            minRows={8}
                                        />{' '}
                                        {touched.address && errors.address && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.address}
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
