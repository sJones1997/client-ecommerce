import { configureStore, applyMiddleware, combineReducers } from "@reduxjs/toolkit";
import registerReducer from '../features/register/registerSlice';
import loginReducer from '../features/login/loginSlice';
import homepageReducer from '../features/homepage/homepageSlice';
import navbarReducer from '../components/navbar/navbarSlice';
import productReducer from "../features/productPage/productPageSlice";
import cartReducer from '../features/cart/cartSlice';

const combinedReducer = combineReducers({
    registerSlice: registerReducer, 
    loginSlice: loginReducer,
    navbarSlice: navbarReducer,
    homepageSlice: homepageReducer,
    productSlice: productReducer,
    cartSlice: cartReducer
});
  
const rootReducer = (state, action) => {
    if(action.type === 'navbarSlice/logout'){
        return combinedReducer(undefined, action);
    }
    return combinedReducer(state, action);
};

export default configureStore({
    reducer: rootReducer
  }, applyMiddleware);