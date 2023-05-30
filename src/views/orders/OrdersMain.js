import { Table, TableCell, TableHead, TableRow, TableBody, TablePagination } from '@mui/material';
import { Box } from '@mui/system';
import MainCard from 'ui-component/cards/MainCard';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { IconEye } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { blockCandidate } from 'store/actions/userActions';
import Loading from 'layout/loader/Loading';
import moment from 'moment';
import { getOrders } from 'store/actions/orderActions';

const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0 } }
    }
}));

const CandidateRows = ({ userData, i, blockUser }) => {
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
                {userData._id}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {userData.currentOrderStatus?.status}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {userData.distributor?.name}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {moment(userData.createdAt).format('Do MMMM YYYY ,  h:mm a')}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                ₹{userData.totalPrice}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                <Link to={userData._id}>
                    <IconEye />
                </Link>
            </TableCell>
        </TableRow>
    );
};

const OrdersMain = ({ getOrders, orders, loading, blockUser }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        getOrders({ params: { userType: 'customer' } });
    }, [getOrders]);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <MainCard title="Orders">
            <>
                {loading ? (
                    <Loading />
                ) : (
                    <Box className="plan" style={{ overflowY: 'auto', minHeight: 'calc(100vh - 365px)' }}>
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">No.</TableCell>
                                    <TableCell align="center">Order Id</TableCell>
                                    <TableCell align="center">Order Status</TableCell>
                                    <TableCell align="center">Distributor</TableCell>
                                    <TableCell align="center">Order Date</TableCell>
                                    <TableCell align="center">Amount</TableCell>
                                    <TableCell align="center">View</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ padding: '10px' }}>
                                {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((userData, i) => (
                                    <CandidateRows key={userData._id} userData={userData} i={i} blockUser={blockUser} />
                                ))}
                            </TableBody>
                        </StyledTable>

                        <TablePagination
                            sx={{ px: 2 }}
                            page={page}
                            component="div"
                            className="page"
                            rowsPerPage={rowsPerPage}
                            count={orders.length}
                            onPageChange={handleChangePage}
                            rowsPerPageOptions={[5, 10, 25]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                        />
                    </Box>
                )}
            </>
        </MainCard>
    );
};

const mapStateToProps = ({ order }) => {
    const { orders, loading } = order;
    return { orders, loading };
};
const mapDispatchToProps = (dispatch) => ({
    getOrders: () => dispatch(getOrders()),
    blockUser: (userData) => dispatch(blockCandidate(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersMain);
