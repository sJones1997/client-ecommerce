import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {baseUrl} from '../../app/App';

export const submitCredentials = createAsyncThunk(
    'registerSlice/submitDetails',
    async (userObj) => {
        const {username, password, confirmPassword} = userObj;
        const basic = `${username}:${password}:${confirmPassword}`;
        const basicEncoded = Buffer.from(basic).toString('base64');
        console.log(basicEncoded)
        const data = await fetch(`${baseUrl}/users`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${basicEncoded}`
            }
        });
        const json = await data.json();
        console.log(json);
        
    }
) 

const registerSlice = createSlice({
    name: 'registerSlice',
    initialState: [],
    reducers: {

    }
});

export default registerSlice.reducer;