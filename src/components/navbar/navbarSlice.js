import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {baseUrl} from '../../app/App';

export const logoutUser = createAsyncThunk(
    'navbarSlice/logout',
    async () => {
        const data = await fetch(`${baseUrl}/auth/logout`, {
            type:'GET',
            credentials: 'include'
        })    
        const json = await data.json();
        return json;    
    }
);


const navbarSlice = createSlice({
    name: 'navbarSlice',
    initialState: {
        isLoading: false,
        hasError: false,
        logoutSuccessful: false,
    },
    extraReducers: {
        [logoutUser.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [logoutUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            if(action.payload.status === 1){
                state.logoutSuccessful = true;
            } else {
                state.logoutSuccessful = false;              
            }
        },
        [logoutUser.pending]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }                
    }    
});

export const successfulLogout = (state) => state.navbarSlice.logoutSuccessful;

export default navbarSlice.reducer;