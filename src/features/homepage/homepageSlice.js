import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../app/App";

export const loadProducts = createAsyncThunk(
    'homepageSlice/loadProducts',
    async () => {
        try {
            const data = await fetch(`${baseUrl}/products`, {
                method:'GET',
                credentials: 'include'
            })
            const {status} = data;
            const json = await data.json();
            json['httpStatus'] = status;
            return json;
        } catch (err) {
            console.log(err)
        }
    }
)

const homepageSlice = createSlice({
    name: 'homepageSlice',
    initialState: {
        productsLoading: false,
        productsError: false,
        products: [],
        errorMsg: '',    
        redirectRequired: false    
    },
    reducers: {

    },
    extraReducers: {
        [loadProducts.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;            
        },
        [loadProducts.fulfilled]:(state, action) => {
            console.log(action.payload)
            state.isLoading = false;
            state.hasError = false;
            if(action.payload.httpStatus === 403){
                state.redirectRequired = true;
            }
            if(action.payload.status === 1){
                state.products = action.payload.message
            } else {
                state.products = 'No products'
            }          
        },
        [loadProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true
        },        
    }
});

export const redirect = (state) => state.homepageSlice.redirectRequired;
export const productLoading = (state) => state.homepageSlice.productsLoading;
export const productErrored = (state) => state.homepageSlice.productsError;
export const allProducts = (state) => state.homepageSlice.products;

export default homepageSlice.reducer;