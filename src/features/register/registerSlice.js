import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {baseUrl} from '../../app/App';

export const submitCredentials = createAsyncThunk(
    'registerSlice/submitDetails',
    async (userObj) => {
        const {username, password, confirmPassword} = userObj;
        if(username.length >= 3 && password.length >= 8 && confirmPassword.length >= 8){
            const basic = `${username}:${password}:${confirmPassword}`;
            const basicEncoded = Buffer.from(basic).toString('base64');
            const data = await fetch(`${baseUrl}/auth`, {
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
        let errorArray = []
        if(username.length < 3){
            errorArray.push(`username "${username}" not long enough (3 characters required)`)
        }
        if(password.length < 8){
            errorArray.push('password not longer enough (8 characters required)')
        }
        if(password !== confirmPassword){
            errorArray.push('passwords do not match');
        }
        return {'message': errorArray}
        
    }
) 

const registerSlice = createSlice({
    name: 'registerSlice',
    initialState: {
        isLoading: false,
        hasError: false,
        registrationSuccessful: null,
        regSessionActive: false,
        redirectRequired: false,
        errorMsg: ''
    },
    reducers: {
        resetMsg: state => {
            state.errorMsg = ''
        }
    },
    extraReducers: {
        [submitCredentials.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false
        },
        [submitCredentials.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            if(action.payload.status === 1){
                state.registrationSuccessful = true
                state.regSessionActive = true;
            } else {
                state.registrationSuccessful = false
                state.regSessionActive = false;
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
export const regSessionActive = (state) => state.registerSlice.regSessionActive;
export const {resetMsg} = registerSlice.actions;
export default registerSlice.reducer;