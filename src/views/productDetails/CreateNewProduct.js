/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import ProductDetailsForm from './ProductDetailsForm';
import { useParams } from 'react-router';
import { createProduct, getProductById, updateProduct } from 'store/actions/productActions';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from 'layout/loader/Loading';

const CreateNewProduct = ({ loading, createNewProduct }) => {
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
        productCode: '',
        price: '',
        minQuantity: 1
    });

    return (
        <MainCard
            title="Create Product"
            contentSX={{ padding: 0 }}
            btnText={'Save'}
            btnEvent={() => {
                const btn = document.getElementById('customerSubmit');
                if (btn) btn.click();
            }}
        >
            {loading ? (
                <Loading />
            ) : (
                <ProductDetailsForm
                    productDetails={productDetails}
                    setProductDetails={setProductDetails}
                    createNewProduct={createNewProduct}
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
    createNewProduct: (ProductDetails, navigate) => dispatch(createProduct(ProductDetails, navigate))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewProduct);
