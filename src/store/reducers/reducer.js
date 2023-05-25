import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import userReducer from './userReducer';
import categoryReducer from './categoryReducer';
import jobReducer from './jobReducer';
import brandReducer from './brandReducer';
import productReducer from './productReducer';
import orderReducer from './orderReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    user: userReducer,
    categories: categoryReducer,
    jobs: jobReducer,
    brands: brandReducer,
    products: productReducer,
    order: orderReducer
});

export default reducer;
