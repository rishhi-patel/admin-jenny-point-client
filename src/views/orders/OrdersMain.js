import { Table, TableCell, TableHead, TableRow, TableBody, TablePagination, Grid, MenuItem, Chip } from '@mui/material';
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import CustomInput from 'views/customerDetails/CustomInput';
import exportFactory from 'views/utilities/exportFactory';
import { grey } from '@mui/material/colors';

const statusList = [
    { label: 'Order Placed', value: 'Order Placed' },
    { label: 'In Process', value: 'In Process' },
    { label: 'In Packaging', value: 'In Packaging' },
    { label: 'Out For Delivery', value: 'Out for Delivery' },
    { label: 'Delivered', value: 'Delivered' }
];

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
    return (
        <TableRow>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {i + 1}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {userData._id}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                <Chip
                    label={userData.currentOrderStatus?.status}
                    sx={{
                        backgroundColor:
                            userData.currentOrderStatus?.status === 'In Process'
                                ? '#e95858d1'
                                : userData.currentOrderStatus?.status === 'In Packaging'
                                ? grey[600]
                                : userData.currentOrderStatus?.status === 'Out for Delivery'
                                ? 'secondary.dark'
                                : userData.currentOrderStatus?.status === 'Delivered'
                                ? 'rgb(25 116 63)'
                                : 'primary.dark',
                        color: '#FFFFFF'
                    }}
                />
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
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [status, setstatus] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };
    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        getOrders({});
    }, []);

    useEffect(() => {
        if (status || (endDate && startDate)) {
            getOrders({ params: { endDate, startDate, status } });
        }
    }, [getOrders, endDate, startDate, status]);

    return (
        <MainCard
            title="Orders"
            btnText="Export To Excel"
            btnEvent={() => {
                exportFactory.exportToExcel(orders);
            }}
            btnText1="Export CSV"
            btnEvent1={() => {
                exportFactory.exportToCsv(orders);
            }}
        >
            <>
                <Grid container>
                    <Grid item xs={12} sm={4} xl={4} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid container item xs={12} sm={8} xl={8} spacing={2}>
                            <Grid item xs={12} sm={4} xl={4}>
                                <CustomInput
                                    select
                                    id="status"
                                    name="status"
                                    // onChange={(e) => assignOrder(e.target.value, values._id)}
                                    // value={values?.distributor?._id}
                                    onChange={(e) => setstatus(e.target.value)}
                                    label="Status"
                                    content={statusList.map((option) => (
                                        <MenuItem value={option.value}>{option.label}</MenuItem>
                                    ))}
                                    sx={{
                                        width: '100%',
                                        '&>div': { height: '51px !important' },
                                        '&>label': { lineHeight: '2rem' },
                                        margin: 0
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} xl={4}>
                                <DatePicker
                                    label="Start Date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                    sx={{ width: '100%' }}
                                    format="DD-MM-YYYY"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} xl={4}>
                                <DatePicker
                                    label="End Date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                    sx={{ width: '100%' }}
                                    format="DD-MM-YYYY"
                                />
                            </Grid>
                        </Grid>
                    </LocalizationProvider>
                </Grid>
                {loading ? (
                    <Loading />
                ) : (
                    <Box className="plan" style={{ overflowY: 'auto', minHeight: 'calc(100vh - 365px)' }}>
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">No.</TableCell>
                                    <TableCell align="center">Order ID</TableCell>
                                    <TableCell align="center">Order Status</TableCell>
                                    <TableCell align="center">Distributor</TableCell>
                                    <TableCell align="center">Order Date</TableCell>
                                    <TableCell align="center">Amount</TableCell>
                                    <TableCell align="center">View</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ padding: '10px' }}>
                                {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((userData, i) => (
                                    <CandidateRows
                                        key={userData._id}
                                        userData={userData}
                                        i={page * rowsPerPage + i}
                                        blockUser={blockUser}
                                    />
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
    getOrders: (params) => dispatch(getOrders(params)),
    blockUser: (userData) => dispatch(blockCandidate(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersMain);
