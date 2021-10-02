import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {baseUrl} from '../../app/App';

export const submitCredentials = createAsyncThunk(
    'loginSlice/submitDetails',
    async (userObj) => {       
        const {username, password} = userObj;
        if(username.length >= 3 && password.length >= 8){
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
        let errorArray = []
        if(username.length < 3){
            errorArray.push(`username "${username}" not long enough (3 characters required)`)
        }
        if(password.length < 8){
            errorArray.push('password not longer enough (8 characters required)')
        }     
        return {'message': errorArray}          
    }
);

export const checkForSession = createAsyncThunk(
    'loginSlice/checkForSession',
    async () => {
        const data = await fetch(`${baseUrl}/auth/verify`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const json = await data.json();
        console.log(json)
        return json;        
    }
)

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: {
        isLoading: false,
        hasError: false,
        loginSuccessful: null,
        sessionActive: false,
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
            state.hasError = false;
        },
        [submitCredentials.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            if(action.payload.status === 1){
                state.loginSuccessful = true;
                state.sessionActive = true;
            } else {
                state.loginSuccessful = false;  
                state.sessionActive = false;
                state.errorMsg = action.payload.message              
            }
        },
        [submitCredentials.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [checkForSession.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [checkForSession.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            if(action.payload.status === 1){
                state.sessionActive = true;
            } else {
                state.sessionActive = false;          
            }
        },
        [checkForSession.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },              
    }
});

export const errorMsg = state => state.loginSlice.errorMsg;
export const successfulLogin = (state) => state.loginSlice.loginSuccessful;
export const sessionCheck = (state) => state.loginSlice.sessionActive;
export const {resetMsg} = loginSlice.actions

export default loginSlice.reducer;