/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { useParams } from 'react-router';
import { deleteUserById, getCandidateById, updateCandidateDetails } from 'store/actions/userActions';
import { Table, TableCell, TableHead, TableRow, TableBody, TablePagination } from '@mui/material';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from 'layout/loader/Loading';
import OrderForm from './OrderForm';
import { Box } from '@mui/system';
import styled from '@emotion/styled';
import { assignDistributor, getOrderByID } from 'store/actions/orderActions';

const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0 } }
    }
}));

const CandidateRows = ({ userData, i }) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(userData.isBlocked);
    }, userData);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        blockUser({ _id: userData._id, isBlocked: event.target.checked });
    };
    return (
        <TableRow>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {i + 1}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {userData.name}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {userData.qty}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                ₹{userData.price}
            </TableCell>
        </TableRow>
    );
};

const OrderDetails = ({ getCandidateDetails, selectedOrder, loading, updateCandidate, assignOrder }) => {
    const { id } = useParams();
    const { orderItems } = selectedOrder;
    const [readOnly, setReadOnly] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        isBlocked: false,
        phoneNo: '',
        address: '',
        gstNo: ''
    });

    useEffect(() => {
        getCandidateDetails(id);
    }, [getCandidateDetails, id]);

    useEffect(() => {
        setUserDetails(selectedOrder);
    }, [selectedOrder]);

    return (
        <MainCard title="Order Details" contentSX={{ padding: 0 }}>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <OrderForm
                        userDetails={userDetails}
                        setUserDetails={setUserDetails}
                        readOnly={readOnly}
                        setReadOnly={setReadOnly}
                        updateCandidate={updateCandidate}
                        assignOrder={assignOrder}
                    />
                    <Box className="plan" style={{ overflowY: 'auto', minHeight: 'calc(100vh - 365px)' }}>
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">No.</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Qty.</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ padding: '10px' }}>
                                {orderItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((userData, i) => (
                                    <CandidateRows key={userData._id} userData={userData} i={page * rowsPerPage + i} />
                                ))}
                                <TableRow>
                                    <TableCell align="center" style={{ paddingLeft: 16 }}>
                                        Total
                                    </TableCell>
                                    <TableCell align="center" style={{ paddingLeft: 16 }}></TableCell>
                                    <TableCell align="center" style={{ paddingLeft: 16 }}></TableCell>
                                    <TableCell align="center" style={{ paddingLeft: 16 }}>
                                        ₹{selectedOrder.totalPrice}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </StyledTable>

                        <TablePagination
                            sx={{ px: 2 }}
                            page={page}
                            component="div"
                            className="page"
                            rowsPerPage={rowsPerPage}
                            count={orderItems.length}
                            onPageChange={handleChangePage}
                            rowsPerPageOptions={[5, 10, 25]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                        />
                    </Box>
                </>
            )}
        </MainCard>
    );
};

const mapStateToProps = ({ order }) => {
    const { selectedOrder, loading } = order;
    return { selectedOrder, loading };
};
const mapDispatchToProps = (dispatch) => ({
    getCandidateDetails: (id) => dispatch(getOrderByID(id)),
    updateCandidate: (_id, DistributorDetails, navigate) => dispatch(updateCandidateDetails(_id, DistributorDetails, navigate)),
    assignOrder: (val, product_id) => dispatch(assignDistributor(val, product_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
