import React, { useState } from 'react';
import { Table, TableCell, TableHead, TableRow, TableBody, TablePagination, IconButton, Menu, MenuItem } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import MainCard from 'ui-component/cards/MainCard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/system';
import { connect } from 'react-redux';
import { createProduct, deleteProduct, getProducts, updateProduct } from 'store/actions/productActions';
import { useEffect } from 'react';
import Loading from 'layout/loader/Loading';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router';

const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0 } }
    }
}));

const CandidateRows = ({ product, i, navigate, deleteProductById }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <TableRow>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {i + 1}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {product.productCode}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {product.name}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {product.price}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {product.minQuantity}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            navigate(product._id);
                        }}
                    >
                        <ModeEditIcon color="success" sx={{ mr: 1 }} />
                        Edit
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            deleteProductById(product._id);
                        }}
                    >
                        <DeleteIcon color="error" sx={{ mr: 1 }} />
                        Delete
                    </MenuItem>
                </Menu>
            </TableCell>
        </TableRow>
    );
};

const ProductsMain = ({ loading, productList, fetchCategotires, updateSelectedProduct, deleteProductById }) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        fetchCategotires();
    }, [fetchCategotires]);

    return (
        <MainCard
            title="Products"
            btnText="+ Add Product"
            btnEvent={() => navigate('new')}
            sx={{ minHeight: '82vh' }}
            contentSX={{ paddingBottom: '0 !important' }}
        >
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Box className="plan" style={{ overflowY: 'auto', minHeight: 'calc(100vh - 335px)' }}>
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">No.</TableCell>
                                    <TableCell align="center">Code</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                    <TableCell align="center">Min. Qty</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ padding: '10px' }}>
                                {productList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, i) => (
                                    <CandidateRows
                                        key={product._id}
                                        product={product}
                                        i={i}
                                        deleteProductById={deleteProductById}
                                        navigate={navigate}
                                    />
                                ))}
                            </TableBody>
                        </StyledTable>
                    </Box>
                    <TablePagination
                        sx={{ px: 2 }}
                        page={page}
                        component="div"
                        className="page"
                        rowsPerPage={rowsPerPage}
                        count={productList.length}
                        onPageChange={handleChangePage}
                        rowsPerPageOptions={[5, 10, 25]}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                    />
                </>
            )}
        </MainCard>
    );
};

const mapStateToProps = ({ products }) => {
    const { loading, products: productList, productModalState, selectedProduct } = products;
    return { loading, productList, productModalState, selectedProduct };
};
const mapDispatchToProps = (dispatch) => ({
    fetchCategotires: () => dispatch(getProducts()),
    createNewProduct: (data) => dispatch(createProduct(data)),
    updateProductDetails: (data, _id) => dispatch(updateProduct(data, _id)),
    deleteProductById: (_id) => dispatch(deleteProduct(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsMain);
