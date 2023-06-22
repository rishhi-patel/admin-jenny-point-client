/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import ProductDetailsForm from './ProductDetailsForm';
import { useParams } from 'react-router';
import { getProductById, updateProduct } from 'store/actions/productActions';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from 'layout/loader/Loading';

const ProductDetails = ({ getProductDetails, selectedProduct, loading, updateProduct }) => {
    const { id } = useParams();
    const [readOnly, setReadOnly] = useState(true);

    const [productDetails, setProductDetails] = useState({
        name: '',
        images: [
            { url: null, key: '' },
            { url: null, key: '' },
            { url: null, key: '' },
            { url: null, key: '' },
            { url: null, key: '' }
        ],
        brand: '',
        category: '',
        subCategory: '',
        description: '',
        discount: '',
        isTrending: false,
        productCode: '',
        price: '',
        minQuantity: 1
    });

    useEffect(() => {
        getProductDetails(id + '?lookup=1');
    }, [getProductDetails, id]);

    useEffect(() => {
        setProductDetails((oldState) => {
            return {
                ...oldState,
                ...selectedProduct
            };
        });
    }, [selectedProduct]);

    return (
        <MainCard
            title="Product Details"
            contentSX={{ padding: 0 }}
            btnText={readOnly ? 'Edit' : 'Save'}
            btnEvent={() => {
                setReadOnly(false);
                if (!readOnly) {
                    const btn = document.getElementById('customerSubmit');
                    if (btn) btn.click();
                }
            }}
            cancelBtn={!readOnly}
            cancelBtnEvent={() => {
                setReadOnly(!readOnly);
                setProductDetails(selectedProduct);
            }}
        >
            {loading ? (
                <Loading />
            ) : (
                <ProductDetailsForm
                    productDetails={productDetails}
                    setProductDetails={setProductDetails}
                    readOnly={readOnly}
                    setReadOnly={setReadOnly}
                    updateProduct={updateProduct}
                />
            )}
        </MainCard>
    );
};

const mapStateToProps = ({ products }) => {
    const { selectedProduct, loading } = products;
    return { selectedProduct, loading };
};
const mapDispatchToProps = (dispatch) => ({
    getProductDetails: (id) => dispatch(getProductById(id)),
    updateProduct: (_id, ProductDetails, navigate) => dispatch(updateProduct(_id, ProductDetails, navigate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
