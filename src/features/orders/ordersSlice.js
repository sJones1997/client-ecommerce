import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../app/App";


export const getOrders = createAsyncThunk(
    'ordersSlice/loadOrders',
    async () => {
        try {

            const data = await fetch(`${baseUrl}/order`, {
                method: 'GET',
                credentials: 'include'
            });

            const {status} = data;
            const json = await data.json()
            console.log(json);
            json['httpStatus'] = status;
            console.log(json)
            return json;

        } catch (err) {
            console.log(err)
        }
    }
)

export const orderSlice = createSlice({
    name: 'ordersSlice',
    initialState: {
        hasErrored: false,
        isLoading: false,
        orders: [],
        redirectRequired: false,        
    },
    reducers: {

    },
    extraReducers: {
        [getOrders.pending]: (state, action) => {
            state.hasErrored = false;
            state.isLoading = true;
        },
        [getOrders.fulfilled]: (state, action) => {
            state.hasErroed = false;
            state.isLoading = false;
            if(action.payload.httpStatus === 403){
                state.redirectRequired = true;
                console.log(state.redirectRequired)
            }       
            if(action.payload.status === 1){
                state.orders = action.payload.message;
                console.log(action.payload.message)
            }     
        },
        [getOrders.rejected]: (state, action) => {
            state.productLoading = false;
            state.productErrored = true;            
        },         
    }
})

export const allOrders = (state) => state.orderSlice.orders
export const ordersLoading = (state) => state.orderSlice.isLoading;
export const ordersErrored = (state) => state.orderSlice.hasErrored;
export const redirectRequired = (state) => state.orderSlice.redirectRequired;

export default orderSlice.reducer;