import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {baseUrl} from '../../app/App';

export const submitCredentials = createAsyncThunk(
    'registerSlice/submitDetails',
    async (userObj) => {
        const {username, password, confirmPassword} = userObj;
        const basic = `${username}:${password}:${confirmPassword}`;
        const basicEncoded = Buffer.from(basic).toString('base64');
        const data = await fetch(`${baseUrl}/auth`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${basicEncoded}`
            }
        });
        const json = await data.json();
        return json;
        
    }
) 

const registerSlice = createSlice({
    name: 'registerSlice',
    initialState: {
        isLoading: false,
        hasError: false,
        registrationSuccessful: null,
        errorMsg: ''
    },
    reducers: {

    },
    extraReducers: {
        [submitCredentials.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false
        },
        [submitCredentials.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            console.log(action.payload)
            if(action.payload.status === 1){
                state.registrationSuccessful = true
            } else {
                state.registrationSuccessful = false
                state.errorMsg = action.payload.message
            }
        },
        [submitCredentials.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true
        },
    }    
});

export const errorMsg = (state) => state.registerSlice.errorMsg;
export const successfulReg = (state) => state.registerSlice.registrationSuccessful;

export default registerSlice.reducer;