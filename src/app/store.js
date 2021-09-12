import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import registerReducer from '../features/register/registerSlice';
import loginReducer from '../features/login/loginSlice';
import navbarReducer from '../components/navbar/navbarSlice';

export default configureStore({
    reducer: {
        registerSlice: registerReducer, 
        loginSlice: loginReducer,
        navbarSlice: navbarReducer
    }
}, applyMiddleware);