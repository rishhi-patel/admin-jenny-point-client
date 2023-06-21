// IMPORTS
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import { Button, FormHelperText, Grid, IconButton, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import CustomInput from 'views/customerDetails/CustomInput';
import { useTheme } from '@emotion/react';
import { Upload } from 'utils/Upload';
import API from 'API';

//APP

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

export default function ProductDetailsForm({ productDetails, readOnly, updateProduct, setProductDetails, createNewProduct }) {
    //TAB STATES
    const navigate = useNavigate();
    const { images, category, subCategory: sub, brand } = productDetails;

    const [categoryList, setcategoryList] = useState([]);
    const [subCategories, setsubCategories] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        (async () => {
            const {
                data: { data }
            } = await API.get('/brand');

            const list = [{ value: brand, label: brand }, ...data];
            const unique = list.filter((obj, index) => {
                return index === list.findIndex((o) => obj.id === o.id && obj.name === o.name);
            });
            setBrandList(
                unique.map((elem) => {
                    return { value: elem.name, label: elem.name };
                })
            );
        })();
    }, [productDetails]);

    useEffect(() => {
        (async () => {
            const {
                data: { data }
            } = await API.get('/category');

            const list = [{ value: category, label: category }, ...data];
            const unique = list.filter((obj, index) => {
                return index === list.findIndex((o) => obj.id === o.id && obj.name === o.name);
            });
            setcategoryList(
                unique.map((elem) => {
                    return { value: elem.name, label: elem.name };
                })
            );
        })();
    }, [productDetails]);

    useEffect(() => {
        (async () => {
            const keyword = activeCategory || category;
            if (keyword) {
                const {
                    data: { data }
                } = await API.get('/category', { params: { keyword } });
                const { subCategory } = data[0];
                const list = [{ value: sub, label: sub }, ...subCategory];
                const unique = list.filter((obj, index) => {
                    return index === list.findIndex((o) => obj.id === o.id && obj.name === o.name);
                });

                setsubCategories(
                    unique.map((elem) => {
                        return { value: elem.name, label: elem.name };
                    })
                );
            }
        })();
    }, [activeCategory, category, productDetails]);

    return (
        <Card variant="outlined" sx={{ height: '100%', width: '100%', padding: 0, border: 'none' }}>
            <Formik
                initialValues={{
                    ...productDetails
                }}
                enableReinitialize
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('Name is required'),
                    brand: Yup.string().max(255).required('Brand is required'),
                    category: Yup.string().max(255).required('Category is required'),
                    subCategory: Yup.string().max(255).required('Sub Category is required'),
                    description: Yup.string().required('Description is required'),
                    productCode: Yup.string().max(255).required('ProductCode is required'),
                    price: Yup.string().max(255).required('Price is required'),
                    images: Yup.lazy((value) => {
                        if (!value[0].url) {
                            return Yup.array().of(
                                Yup.object().shape({
                                    key: Yup.string().required()
                                })
                            );
                        }
                        return Yup.array().of(
                            Yup.object().shape({
                                key: Yup.string()
                            })
                        );
                    })
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (createNewProduct) {
                            createNewProduct(
                                {
                                    ...values
                                },
                                navigate
                            );
                        } else {
                            updateProduct(
                                productDetails._id,
                                {
                                    ...values
                                },
                                navigate
                            );
                        }
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
                                textAlign: { xs: 'center', md: 'start' }
                            }}
                        >
                            <FormControl fullWidth>
                                <Grid container direction={{ xs: 'column', md: 'row' }} columnSpacing={5} rowSpacing={3}>
                                    <Grid component="form" item xs={12}>
                                        <label style={{ fontWeight: 'bold' }} htmlFor={'images'}>
                                            Images
                                        </label>
                                        <Grid container sx={{ justifyContent: 'space-between', padding: '8px 0' }}>
                                            {images.map((img, i) => (
                                                <Grid item xs={12} lg={2} sx={{ height: 150 }}>
                                                    <Upload
                                                        imgData={img}
                                                        updateImage={setProductDetails}
                                                        index={i}
                                                        disabled={readOnly}
                                                        error={errors.images}
                                                        values={values}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>

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
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomInput
                                            select
                                            id="brand"
                                            name="brand"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setActiveCategory(e.target.value);
                                            }}
                                            disabled={readOnly}
                                            title="Brand"
                                            value={values.brand}
                                            error={touched.brand && errors.brand}
                                            content={brandList.map((option) => (
                                                <MenuItem value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        />
                                        {touched.brand && errors.brand && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.brand}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid item xs={6}>
                                        <CustomInput
                                            select
                                            id="category"
                                            name="category"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setActiveCategory(e.target.value);
                                            }}
                                            disabled={readOnly}
                                            title="Category"
                                            value={values.category}
                                            error={touched.category && errors.category}
                                            content={categoryList.map((option) => (
                                                <MenuItem value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        />
                                        {touched.category && errors.category && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.category}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid item xs={6}>
                                        <CustomInput
                                            select
                                            id="subCategory"
                                            name="subCategory"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            disabled={readOnly}
                                            title="Sub Category"
                                            value={values.subCategory}
                                            error={touched.subCategory && errors.subCategory}
                                            content={subCategories.map((option) => (
                                                <MenuItem value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        />{' '}
                                        {touched.subCategory && errors.subCategory && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.subCategory}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid component="form" item xs={6}>
                                        <CustomInput
                                            id="productCode"
                                            name="productCode"
                                            value={values.productCode}
                                            title="Product Code"
                                            disabled={readOnly}
                                            error={touched.productCode && errors.productCode}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.productCode && errors.productCode && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.productCode}
                                            </FormHelperText>
                                        )}
                                        <CustomInput
                                            id="phone"
                                            type="number"
                                            name="price"
                                            value={values.price}
                                            // onChange={changeField}
                                            title="Price"
                                            disabled={readOnly}
                                            error={touched.price && errors.price}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.price && errors.price && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.price}
                                            </FormHelperText>
                                        )}
                                        <CustomInput
                                            id="minQuantity"
                                            name="minQuantity"
                                            type="number"
                                            value={values.minQuantity}
                                            // onChange={changeField}
                                            title="Minimum Quantity"
                                            disabled={readOnly}
                                            error={touched.minQuantity && errors.minQuantity}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.minQuantity && errors.minQuantity && (
                                            <FormHelperText error id="standard-weight-helper-text-minQuantity-login">
                                                {errors.minQuantity}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid item xs={6}>
                                        <CustomInput
                                            id="Description"
                                            name="description"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            disabled={readOnly}
                                            value={values.description}
                                            title="Product Description"
                                            multiline
                                            minRows={8}
                                        />{' '}
                                        {touched.description && errors.description && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.description}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={6}></Grid>
                                    <Grid item xs={6}>
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
                                </Grid>
                            </FormControl>
                        </CardContent>
                    </form>
                )}
            </Formik>
        </Card>
    );
}
