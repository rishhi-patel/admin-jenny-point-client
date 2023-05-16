import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Box } from '@mui/system';
import CategoryCard from './CategoryCard';
import { Button, Grid } from '@mui/material';
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
    useEffect(() => {
        fetchCategotires();
    }, [fetchCategotires]);

    return (
        <MainCard title="Categories" btnText="+ Add Category" btnEvent={() => updateModalState(true)} sx={{ minHeight: '82vh' }}>
            {loading ? (
                <Loading />
            ) : (
                <Grid container spacing={6}>
                    {categoryList.map((category) => (
                        <Grid item xl={3} lg={4} md={6} sm={6} xs={12} key={category._id}>
                            <CategoryCard
                                category={category}
                                updateSelectedCategory={updateSelectedCategory}
                                deleteCategoryById={deleteCategoryById}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
            <CreateCategoryModal
                open={categoryModalState}
                setOpen={updateModalState}
                saveCategory={createNewCategory}
                selectedCategory={selectedCategory}
                updateCategoryDetails={updateCategoryDetails}
            />
        </MainCard>
    );
};

const mapStateToProps = ({ categories }) => {
    const { loading, categories: categoryList, categoryModalState, selectedCategory } = categories;
    return { loading, categoryList, categoryModalState, selectedCategory };
};
const mapDispatchToProps = (dispatch) => ({
    fetchCategotires: () => dispatch(getCategories()),
    createNewCategory: (data) => dispatch(createCategory(data)),
    updateModalState: (status) => dispatch(changeModalState(status)),
    updateSelectedCategory: (category) => dispatch(changeCategorySelection(category)),
    updateCategoryDetails: (data, _id) => dispatch(updateCategory(data, _id)),
    deleteCategoryById: (_id) => dispatch(deleteCategory(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesMain);
