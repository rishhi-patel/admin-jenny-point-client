/* eslint-disable jsx-a11y/label-has-associated-control */
// IMPORTS
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import { Button, Chip, FormHelperText, Grid, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import CustomInput from 'views/customerDetails/CustomInput';
import { useEffect } from 'react';
import API from 'API';
import { width } from '@mui/system';
import { grey } from '@mui/material/colors';

//APP
export default function OrderForm({ userDetails, add, readOnly, setReadOnly, updateCandidate, assignOrder }) {
    //TAB STATES
    const navigate = useNavigate();
    const [distributors, setDistributors] = React.useState([]);

    useEffect(() => {
        (async () => {
            const {
                data: { data }
            } = await API.get('/admin/distributors');
            setDistributors(data);
        })();
    }, []);

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
                                    <Grid item xs={6}>
                                        <CustomInput
                                            id="name"
                                            name="name"
                                            value={values.user?.name}
                                            title="Name"
                                            disabled={readOnly}
                                            error={touched.name && errors.name}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                        />
                                        {touched.name && errors.name && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.name}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomInput
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={values.user?.email}
                                            // onChange={changeField}
                                            title="Email Address"
                                            disabled={readOnly}
                                            error={touched.email && errors.email}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={6}>
                                        {' '}
                                        <CustomInput
                                            id="phone"
                                            name="mobileNo"
                                            value={values.user?.mobileNo}
                                            // onChange={changeField}
                                            title="Phone No."
                                            disabled={readOnly}
                                            error={touched.mobileNo && errors.mobileNo}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                        />
                                        {touched.mobileNo && errors.mobileNo && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.mobileNo}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={6}>
                                        {Boolean(distributors.length) && (
                                            <>
                                                <CustomInput
                                                    select
                                                    id="distributors"
                                                    name="distributors"
                                                    onChange={(e) => assignOrder(e.target.value, values._id)}
                                                    disabled={readOnly}
                                                    title="Assign Distributor"
                                                    value={values?.distributor?._id || values?.distributor}
                                                    error={touched.distributors && errors.distributors}
                                                    content={distributors.map((option) => (
                                                        <MenuItem value={option.value}>{option.label}</MenuItem>
                                                    ))}
                                                />
                                                {touched.distributors && errors.distributors && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.distributors}
                                                    </FormHelperText>
                                                )}
                                            </>
                                        )}
                                    </Grid>
                                    <Grid component="form" item xs={6} sx={{ '&>div': { marginBottom: '24px' } }}>
                                        <CustomInput
                                            id="phone"
                                            name="order_id"
                                            value={'#' + values._id}
                                            // onChange={changeField}
                                            title="Order ID"
                                            disabled={readOnly}
                                            error={touched.order_id && errors.order_id}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                        />
                                        {touched.order_id && errors.order_id && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.order_id}
                                            </FormHelperText>
                                        )}
                                        {/* <CustomInput
                                            type="orderStatus"
                                            id="orderStatus"
                                            name="orderStatus"
                                            value={values.currentOrderStatus?.status}
                                            // onChange={changeField}
                                            title="Order Status"
                                            disabled={readOnly}
                                            error={touched.orderStatus && errors.orderStatus}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                        />
                                        {touched.orderStatus && errors.orderStatus && (
                                            <FormHelperText error id="standard-weight-helper-text-orderStatus-login">
                                                {errors.orderStatus}
                                            </FormHelperText>
                                        )} */}{' '}
                                        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Order Status</label>
                                        <Chip
                                            label={values.currentOrderStatus?.status}
                                            sx={{
                                                backgroundColor:
                                                    values.currentOrderStatus?.status === 'In Process'
                                                        ? '#e95858d1'
                                                        : values.currentOrderStatus?.status === 'In Packaging'
                                                        ? grey[600]
                                                        : values.currentOrderStatus?.status === 'Out for Delivery'
                                                        ? 'secondary.dark'
                                                        : values.currentOrderStatus?.status === 'Delivered'
                                                        ? 'rgb(25 116 63)'
                                                        : 'primary.dark',
                                                color: '#FFFFFF'
                                            }}
                                        />
                                        <CustomInput
                                            id="phone"
                                            name="totalPrice"
                                            value={values.totalPrice}
                                            // onChange={changeField}
                                            title="Total Amount"
                                            disabled={readOnly}
                                            error={touched.totalPrice && errors.totalPrice}
                                            // onBlur={handleBlur}
                                            // onChange={handleChange}
                                        />
                                        {touched.totalPrice && errors.totalPrice && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.totalPrice}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid container item xs={6} spacing={2}>
                                        <Grid item sm={6} xs={12}>
                                            {' '}
                                            <CustomInput
                                                id="Address"
                                                name="address"
                                                // onBlur={handleBlur}
                                                // onChange={handleChange}
                                                disabled={readOnly}
                                                value={values.shippingAddress}
                                                title="Address"
                                                multiline
                                                minRows={7}
                                            />{' '}
                                            {touched.address && errors.address && (
                                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                                    {errors.address}
                                                </FormHelperText>
                                            )}
                                        </Grid>
                                        <Grid item sm={6} xs={12}>
                                            {values.invoice && values.invoice.url !== '' ? (
                                                <>
                                                    {' '}
                                                    <label style={{ fontWeight: 'bold' }}>Invoice</label>
                                                    <img
                                                        src={values.invoice.url}
                                                        alt="test"
                                                        style={{ height: 160, width: '100%', marginTop: '8px', borderRadius: 12 }}
                                                    />
                                                </>
                                            ) : (
                                                <img
                                                    src={process.env.PUBLIC_URL + '/images/Invoice.png'}
                                                    style={{ height: 160, width: '100%', marginTop: '26px', borderRadius: 12 }}
                                                    alt="invoice"
                                                />
                                            )}
                                        </Grid>
                                        {values.invoice && (
                                            <Button
                                                fullWidth
                                                color="secondary"
                                                component="a"
                                                variant="contained"
                                                href={values.invoice.url}
                                                rel="noopener noreferrer"
                                                sx={{ height: 40, width: '47%', marginLeft: 'auto' }}
                                                disabled={values.invoice && values.invoice.url === ''}
                                            >
                                                Download Invoice
                                            </Button>
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
