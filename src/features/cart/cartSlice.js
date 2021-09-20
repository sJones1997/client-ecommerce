import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../app/App";


export const getUserCart = createAsyncThunk(
    'cartSlice/getUserCart',
    async () => {
        try {
            const data = await fetch(`${baseUrl}/cart/userCart`, {
                method: 'GET',
                credentials: 'include'
            });
            const {status} = data;
            const json = await data.json();
            json['httpStatus'] = status;
            return json
        } catch (err) {
            console.log(err)
        }
    }
);

export const getCartItems = createAsyncThunk(
    'cartSlice/getCartItems',
    async (obj) => {
        try {
            const data = await fetch(`${baseUrl}/cart/`)
        } catch (err) {
              
        }
    }
)

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        cartErrored: false,
        cartLoading: false,
        redirectRequired: false,
        cartItems: [],
        cartId: null
    },
    reducers: {

    },
    extraReducers: {
        [getUserCart.pending]: (state, action) => {
            state.cartLoading = true;
            state.cartErrored = false;
        },
        [getUserCart.fulfilled]: (state, action) => {
            state.cartLoading = false;
            state.cartErrored = false; 
            if(action.payload.httpStatus === 403){
                state.redirectRequired = true;
            }
            if(action.payload.status === 1){
                state.cartId = action.payload.message;
            } else {
                state.cartErrored = true;
                state.cartId = action.payload.message;
            }              
        },
        [getUserCart.rejected]: (state, action) => {
            state.cartLoading = false;
            state.cartErrored = true;            
        }         
    }
})

export const userCartId = (state) => state.cartSlice.cartId;

export default cartSlice.reducer;