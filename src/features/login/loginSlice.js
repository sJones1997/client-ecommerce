import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {baseUrl} from '../../app/App';

export const submitCredentials = createAsyncThunk(
    'loginSlice/submitDetails',
    async (userObj) => {
        const {username, password} = userObj;
        const basic = `${username}:${password}`;
        const basicEncoded = Buffer.from(basic).toString('base64');
        const data = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            credentials: 'include',            
            headers: {              
                'Accept': 'application/json',
                'Authorization': `Basic ${basicEncoded}`
            }
        });
        const json = await data.json();
        return json;
        
    }
);

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: {
        isLoading: false,
        hasError: false,
        loginSuccessful: null,
        errorMsg: ''
    },
    reducers: {

    },
    extraReducers: {
        [submitCredentials.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [submitCredentials.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            if(action.payload.status === 1){
                state.loginSuccessful = true;
            } else {
                state.loginSuccessful = false;  
                state.errorMsg = action.payload.message              
            }
        },
        [submitCredentials.pending]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }                
    }
});

export const errorMsg = (state) => state.loginSlice.errorMsg;
export const successfulLogin = (state) => state.loginSlice.loginSuccessful;

export default loginSlice.reducer;