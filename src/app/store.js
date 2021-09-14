import { configureStore, applyMiddleware, combineReducers } from "@reduxjs/toolkit";
import registerReducer from '../features/register/registerSlice';
import loginReducer from '../features/login/loginSlice';
import navbarReducer from '../components/navbar/navbarSlice';

const combinedReducer = combineReducers({
    registerSlice: registerReducer, 
    loginSlice: loginReducer,
    navbarSlice: navbarReducer
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