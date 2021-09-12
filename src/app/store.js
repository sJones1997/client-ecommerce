import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import registerReducer from '../features/register/registerSlice';
import loginReducer from '../features/login/loginSlice';

export default configureStore({
    reducer: {
        registerSlice: registerReducer, 
        loginSlice: loginReducer
    }
}, applyMiddleware);