// IMPORTS
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import { Button, FormHelperText, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import CustomInput from 'views/customerDetails/CustomInput';
//APP
export default function DistributorForm({ userDetails, add, readOnly, setReadOnly, updateCandidate }) {
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
                    name: Yup.string().max(255).required('Name is required'),
                    email: Yup.string()
                        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address')
                        .required('Email is required'),
                    mobileNo: Yup.string().min(10, 'Please Enter Valid Mobile Number').required('Mobile Number is required'),
                    address: Yup.string().max(255).required('Address is required'),
                    gstNo: Yup.string()
                        .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GST Number')
                        .required('GST Number is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, preventDefault }) => {
                    try {
                        if (add) {
                            setSubmitting(true);
                            updateCandidate(values, navigate);
                        } else updateCandidate(userDetails._id, values, navigate);
                        setStatus({ success: true });
                        setReadOnly(true);
                        setSubmitting(false);
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                    <Form
                        noValidate
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(e);
                        }}
                    >
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
                                    <Grid item xs={6}>
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
                                    </Grid>
                                    <Grid item xs={6}>
                                        {' '}
                                        <CustomInput
                                            id="gstNo"
                                            name="gstNo"
                                            value={values.gstNo}
                                            title="GST No."
                                            disabled={readOnly}
                                            error={touched.gstNo && errors.gstNo}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.gstNo && errors.gstNo && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.gstNo}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid component="form" item xs={6}>
                                        <CustomInput
                                            id="mobileNo"
                                            name="mobileNo"
                                            value={values.mobileNo}
                                            // onChange={changeField}
                                            title="Phone No."
                                            disabled={readOnly}
                                            error={touched.mobileNo && errors.mobileNo}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            onKeyPress={(event) => {
                                                var charCode = event.which ? event.which : event.keyCode;
                                                if (String.fromCharCode(charCode).match(/[^0-9]/g) || event.target.value.length > 9) {
                                                    event.preventDefault();
                                                }
                                            }}
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

                                    <Button
                                        type="submit"
                                        id="customerSubmit"
                                        variant="contained"
                                        color="secondary"
                                        style={{ display: 'block', marginLeft: 'auto' }}
                                    >
                                        save
                                    </Button>
                                </Grid>
                            </FormControl>
                        </CardContent>
                    </Form>
                )}
            </Formik>
        </Card>
    );
}
