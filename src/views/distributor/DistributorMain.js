import {
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    TablePagination,
    Switch,
    Grid,
    InputAdornment,
    MenuItem,
    Menu,
    IconButton
} from '@mui/material';
import { Box } from '@mui/system';
import MainCard from 'ui-component/cards/MainCard';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { blockCandidate, deleteUserById, getCustomer } from 'store/actions/userActions';
import Loading from 'layout/loader/Loading';
import CustomInput from 'views/customerDetails/CustomInput';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0 } }
    }
}));

const CandidateRows = ({ userData, i, blockUser, navigate, deleteUser }) => {
    const [checked, setChecked] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                {userData.mobileNo}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {userData.address}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                <Switch color="secondary" checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {/* <Link to={userData._id}>
                    <IconEye />
                </Link> */}
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
                            navigate(userData._id);
                        }}
                    >
                        <ModeEditIcon color="success" sx={{ mr: 1 }} />
                        Edit
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            deleteUser(userData._id);
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

const DistributorMain = ({ getCandidateList, customers, loading, blockUser, deleteUser }) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [keyword, setKeyword] = useState('');
    const [compLoaded, setCompLoaded] = useState(false);

    useEffect(() => {
        getCandidateList({ params: { userType: 'distributor' } });
        setCompLoaded(true);
    }, [getCandidateList]);

    // search after delay
    useEffect(() => {
        if (compLoaded) {
            const setData = setTimeout(() => {
                getCandidateList({ params: { keyword, userType: 'distributor' } });
            }, 1000);
            return () => clearTimeout(setData);
        }
    }, [keyword, getCandidateList]);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <MainCard
            title="Distributors"
            btnText="+ Add Distributor"
            btnEvent={() => navigate('new')}
            sx={{ minHeight: '82vh' }}
            contentSX={{ paddingBottom: '0 !important' }}
        >
            <>
                <Grid container>
                    <Grid item xs={12} sm={6} xl={7} />
                    <Grid item xs={12} sm={6} xl={5}>
                        <CustomInput
                            onChange={(e) => setKeyword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                </Grid>
                {loading ? (
                    <Loading />
                ) : (
                    <Box className="plan" style={{ overflowY: 'auto', minHeight: 'calc(100vh - 365px)' }}>
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">No.</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Mobile</TableCell>
                                    <TableCell align="center">Address</TableCell>
                                    <TableCell align="center">Block</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ padding: '10px' }}>
                                {customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((userData, i) => (
                                    <CandidateRows
                                        key={userData._id}
                                        userData={userData}
                                        i={page * rowsPerPage + i}
                                        blockUser={blockUser}
                                        navigate={navigate}
                                        deleteUser={deleteUser}
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
                            count={customers.length}
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

const mapStateToProps = ({ user }) => {
    const { customers, loading } = user;
    return { customers, loading };
};
const mapDispatchToProps = (dispatch) => ({
    getCandidateList: (query) => dispatch(getCustomer(query)),
    blockUser: (userData) => dispatch(blockCandidate(userData)),
    deleteUser: (_id) => dispatch(deleteUserById(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DistributorMain);
