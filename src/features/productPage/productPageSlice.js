import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../app/App";

export const getProductDetails = createAsyncThunk(
    'productSlice/loadProducts',
    async (obj) => {
        const {id} = obj
        try {
            const data = await fetch(`${baseUrl}/products/${id}`, {
                method: 'GET',
                credentials: 'include'
            })
            const {status} = data;
            const json = await data.json();
            json['httpStatus'] = status;
            return json
        } catch (err) {
            console.log(err)
        }
    }
)

export const addToCart = createAsyncThunk(
    'productSlice/addToCart', 
    async (obj) => {
        const {productId, orderQuantity} = obj;
        try {
            const data = await fetch(`${baseUrl}/cart/cartItem`, {
                method: 'POST',
                credentials: 'include',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'                    
                },             
                body: JSON.stringify({productId: productId, orderQuantity: orderQuantity})
            });

            const {status} = data;
            const json = await data.json();
            console.log(json)
            json['httpStatus'] = status;
            return json;

        } catch (err) {
            console.log(JSON.parse(err))
        }
    }
)

const productSlice = createSlice({
    name: 'productSlice',
    initialState: {
        productDetails: {},
        productErrored: false,
        productLoading: false,
        addToCartLoading: false,
        addToCartFailed: false,
        redirectRequired: false,
        cartSuccessMessage: ''
    },
    reducers: {
        resetMessage: (state) => {
            state.cartSuccessMessage = '';
        }
    },
    extraReducers: {
        [getProductDetails.pending]: (state, action) => {
            state.productLoading = true;
            state.productErrored = false;
        },
        [getProductDetails.fulfilled]: (state, action) => {
            state.productLoading = false;
            state.productErrored = false; 
            if(action.payload.httpStatus === 403){
                state.redirectRequired = true;
            }
            if(action.payload.status === 1){
                state.productDetails = action.payload.message;
            } else {
                state.productErrored = true;
                state.productDetails = action.payload.message;
            }              
        },
        [getProductDetails.rejected]: (state, action) => {
            state.productLoading = false;
            state.productErrored = true;            
        }, 
        [addToCart.pending]: (state, action) => {
            state.addToCartLoading = true;
            state.addToCartFailed = false;
        },
        [addToCart.fulfilled]: (state, action) => {
            state.addToCartLoading = false;
            state.addToCartFailed = false; 
            if(action.payload.httpStatus === 403){
                state.redirectRequired = true;
            }
            if(action.payload.status === 1){
                state.addToCartFailed = false;
                state.cartSuccessMessage = action.payload.message;
            } else {
                state.addToCartFailed = true;
            }              
        },
        [addToCart.rejected]: (state, action) => {
            state.addToCartLoading = false;
            state.addToCartFailed = true;            
        }                
    }
});

export const redirect = (state) => state.productSlice.redirectRequired;
export const productLoading = (state) => state.productSlice.productsLoading;
export const productErrored = (state) => state.productSlice.productsError;
export const productDetails = (state) => state.productSlice.productDetails;
export const cartUpdated = (state) => state.productSlice.cartSuccessMessage;
export const {resetMessage} = productSlice.actions;

export default productSlice.reducer