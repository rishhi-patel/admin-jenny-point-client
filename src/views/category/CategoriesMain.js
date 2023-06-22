import React, { useState } from 'react';
import {
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    TablePagination,
    IconButton,
    Menu,
    MenuItem,
    Grid,
    InputAdornment
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import MainCard from 'ui-component/cards/MainCard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/system';
import CreateCategoryModal from './CreateCategoryModal';
import { connect } from 'react-redux';
import {
    changeCategorySelection,
    changeModalState,
    createCategory,
    deleteCategory,
    getCategories,
    updateCategory
} from 'store/actions/categoryActions';
import { useEffect } from 'react';
import Loading from 'layout/loader/Loading';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router';
import CustomInput from 'views/customerDetails/CustomInput';
import SearchIcon from '@mui/icons-material/Search';
import DeleteCategoryModal from './CategoryDeleteModal';

const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0 } }
    }
}));

const CandidateRows = ({ category, i, updateSelectedCategory, deleteCategoryById }) => {
    const navigate = useNavigate();
    const [modalState, setmodalState] = useState(false);
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
                {category.name}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                <img src={category.image.url} alt="category" style={{ height: 100, width: 100 }} />
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
                    <MenuItem onClick={() => navigate(category._id)}>
                        <VisibilityIcon color="secondary" sx={{ mr: 1 }} /> View Subcategories
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            updateSelectedCategory(category);
                        }}
                    >
                        <ModeEditIcon color="success" sx={{ mr: 1 }} />
                        Edit
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            setmodalState(true);
                        }}
                    >
                        <DeleteIcon color="error" sx={{ mr: 1 }} />
                        Delete
                    </MenuItem>
                </Menu>
            </TableCell>
            <DeleteCategoryModal open={modalState} setOpen={setmodalState} confirmDelete={() => deleteCategoryById(category._id)} />
        </TableRow>
    );
};

const CategoriesMain = ({
    loading,
    categoryList,
    fetchCategotires,
    createNewCategory,
    categoryModalState,
    updateModalState,
    selectedCategory,
    updateSelectedCategory,
    updateCategoryDetails,
    deleteCategoryById
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [keyword, setKeyword] = useState('');
    const [compLoaded, setCompLoaded] = useState(false);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        fetchCategotires({ params: { keyword } });
        setCompLoaded(true);
    }, []);

    useEffect(() => {
        if (compLoaded) {
            const setData = setTimeout(() => {
                fetchCategotires({ params: { keyword } });
            }, 1000);
            return () => clearTimeout(setData);
        }
    }, [keyword]);

    return (
        <MainCard
            title="Categories"
            btnText="+ Add Category"
            btnEvent={() => updateModalState(true)}
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
                    <>
                        <Box className="plan" style={{ overflowY: 'auto', minHeight: 'calc(100vh - 365px)' }}>
                            <StyledTable>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">No.</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Image</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{ padding: '10px' }}>
                                    {categoryList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, i) => (
                                        <CandidateRows
                                            key={category._id}
                                            category={category}
                                            i={page * rowsPerPage + i}
                                            updateSelectedCategory={updateSelectedCategory}
                                            deleteCategoryById={deleteCategoryById}
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
                            count={categoryList.length}
                            onPageChange={handleChangePage}
                            rowsPerPageOptions={[5, 10, 25]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                        />
                    </>
                )}
                <CreateCategoryModal
                    open={categoryModalState}
                    setOpen={updateModalState}
                    saveCategory={createNewCategory}
                    selectedCategory={selectedCategory}
                    updateCategoryDetails={updateCategoryDetails}
                />
            </>
        </MainCard>
    );
};

const mapStateToProps = ({ categories }) => {
    const { loading, categories: categoryList, categoryModalState, selectedCategory } = categories;
    return { loading, categoryList, categoryModalState, selectedCategory };
};
const mapDispatchToProps = (dispatch) => ({
    fetchCategotires: (query) => dispatch(getCategories(query)),
    createNewCategory: (data) => dispatch(createCategory(data)),
    updateModalState: (status) => dispatch(changeModalState(status)),
    updateSelectedCategory: (category) => dispatch(changeCategorySelection(category)),
    updateCategoryDetails: (data, _id) => dispatch(updateCategory(data, _id)),
    deleteCategoryById: (_id) => dispatch(deleteCategory(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesMain);
