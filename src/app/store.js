import { configureStore, applyMiddleware, combineReducers } from "@reduxjs/toolkit";
import registerReducer from '../features/register/registerSlice';
import loginReducer from '../features/login/loginSlice';
import homepageReducer from '../features/homepage/homepageSlice';
import navbarReducer from '../components/navbar/navbarSlice';

const combinedReducer = combineReducers({
    registerSlice: registerReducer, 
    loginSlice: loginReducer,
    navbarSlice: navbarReducer,
    homepageSlice: homepageReducer
});
  
const rootReducer = (state, action) => {
    console.log(action.type)
    if(action.type === 'navbarSlice/logout'){
        return combinedReducer(undefined, action);
    }
    return combinedReducer(state, action);
};

export default configureStore({
    reducer: rootReducer
  }, applyMiddleware);