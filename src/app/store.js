import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import registerReducer from '../features/register/registerSlice';

export default configureStore({
    reducer: {
        registerSlice: registerReducer 
    }
}, applyMiddleware);