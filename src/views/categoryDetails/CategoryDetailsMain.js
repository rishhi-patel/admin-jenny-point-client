import React, { useState } from 'react';
import { Table, TableCell, TableHead, TableRow, TableBody, TablePagination, IconButton, Menu, MenuItem } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import MainCard from 'ui-component/cards/MainCard';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/system';
import SubCategoryModal from './SubCategoryModal';
import { connect } from 'react-redux';
import {
    changeSubCategoryModalState,
    changeSubCategorySelection,
    createSubCategory,
    deleteSubCategory,
    getSubCategories,
    updateSubCategory
} from 'store/actions/categoryActions';
import { useEffect } from 'react';
import Loading from 'layout/loader/Loading';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router';
import DeleteCategoryModal from 'views/category/CategoryDeleteModal';

const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0 } }
    }
}));

const CandidateRows = ({ category, i, updateSelectedCategory, deleteCategoryById, id }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [modalState, setmodalState] = useState(false);
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
            </TableCell>{' '}
            <DeleteCategoryModal open={modalState} setOpen={setmodalState} confirmDelete={() => deleteCategoryById(id, category._id)} />
        </TableRow>
    );
};

const CategoryDetailsMain = ({
    loading,
    fetchCategotires,
    createNewCategory,
    updateModalState,
    updateSelectedCategory,
    updateCategoryDetails,
    deleteCategoryById,
    mainCategory,
    selectedSubCategory,
    subCategoryModalState
}) => {
    const { id } = useParams();
    const { subCategory } = mainCategory;
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
        fetchCategotires(id);
    }, [fetchCategotires]);

    return (
        <MainCard
            title={mainCategory.name && `${mainCategory.name}'s Sub Categories`}
            btnText="+ Add"
            btnEvent={() => updateModalState(true)}
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
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ padding: '10px' }}>
                                {subCategory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, i) => (
                                    <CandidateRows
                                        key={category._id}
                                        category={category}
                                        i={page * rowsPerPage + i}
                                        id={id}
                                        updateSelectedCategory={updateSelectedCategory}
                                        deleteCategoryById={deleteCategoryById}
                                    />
                                ))}
                            </TableBody>
                        </StyledTable>
                    </Box>
                    <TablePagination
                        sx={{ py: 0 }}
                        page={page}
                        component="div"
                        className="page"
                        rowsPerPage={rowsPerPage}
                        count={subCategory.length}
                        onPageChange={handleChangePage}
                        rowsPerPageOptions={[5, 10, 25]}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                    />
                </>
            )}
            <SubCategoryModal
                open={subCategoryModalState}
                setOpen={updateModalState}
                saveCategory={createNewCategory}
                selectedCategory={selectedSubCategory}
                updateCategoryDetails={updateCategoryDetails}
            />
        </MainCard>
    );
};

const mapStateToProps = ({ categories }) => {
    const { loading, mainCategory, selectedSubCategory, subCategoryModalState } = categories;
    return { loading, mainCategory, selectedSubCategory, subCategoryModalState };
};
const mapDispatchToProps = (dispatch) => ({
    fetchCategotires: (_id) => dispatch(getSubCategories(_id)),
    createNewCategory: (data, _id) => dispatch(createSubCategory(data, _id)),
    updateModalState: (status) => dispatch(changeSubCategoryModalState(status)),
    updateSelectedCategory: (category) => dispatch(changeSubCategorySelection(category)),
    updateCategoryDetails: (data, parent_id, _id) => dispatch(updateSubCategory(data, parent_id, _id)),
    deleteCategoryById: (parent_id, _id) => dispatch(deleteSubCategory(parent_id, _id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailsMain);
