import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../app/App";


export const placeOrder = createAsyncThunk(
    'checkoutSlice/placeOrder',
    async () => {
        try {
            const data = await fetch(`${baseUrl}/order`, {
                method: 'POST',
                credentials: 'include',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'                    
                }
            });

            const {status} = data;
            const json = await data.json();
            json['httpStatus'] = status;
            return json;
        } catch(err) {
            console.log(err)
        }
    }
);

export const createPaymentIntent = createAsyncThunk(
    'checkoutSlice/createPaymentIntent',
    async (obj) => {
        try {
            const data = await fetch(`${baseUrl}/checkout/create-payment-intent`, {
                method: "POST",
                credentials: 'include',
                headers: {
                  "Content-Type": "application/json"
                }                
            })
            const {status} = data;
            const json = await data.json();
            json['httpStatus'] = status;
            return json;

        } catch(err) {

        }
    }
)

const checkoutSlice = createSlice({
    name: 'checkoutSlice',
    initialState: {
        isLoading: false,
        hasError: false,
        orderSuccess: false,
        clientSecret: ''
    },
    reducers: {
        resetOrderStatus: (state) => {
            state.orderSuccess = false;
        }
    },
    extraReducers: {
        [placeOrder.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [placeOrder.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            if(action.payload.status === 1){
                state.orderSuccess = true
            }
        },
        [placeOrder.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [createPaymentIntent.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [createPaymentIntent.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            if(action.payload.status === 1){
                state.clientSecret = action.payload.message
            }
        },
        [createPaymentIntent.pending]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }         
    }
})

export const orderPlaced = (state) => state.checkoutSlice.orderSuccess;
export const checkoutState = (state) => state.checkoutSlice.checkoutState;
export const {resetOrderStatus} = checkoutSlice.actions;
export const clientSecret = (state) => state.checkoutSlice.clientSecret;

export default checkoutSlice.reducer;