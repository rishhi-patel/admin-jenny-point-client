import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import userReducer from './userReducer';
import categoryReducer from './categoryReducer';
import jobReducer from './jobReducer';
import brandReducer from './brandReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    user: userReducer,
    categories: categoryReducer,
    jobs: jobReducer,
    brands: brandReducer
});

export default reducer;
