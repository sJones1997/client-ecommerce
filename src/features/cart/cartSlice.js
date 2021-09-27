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
            console.log(data)
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
        const {id} = obj;
        try {
            const data = await fetch(`${baseUrl}/cart/cartItems/${id}`, {
                type: 'GET',
                credentials: 'include',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'                    
                }                
            });
            console.log(data)
            const {status} = data;
            const json = await data.json();
            json['httpStatus'] = status;
            return json;
        } catch (err) {
            console.log(err)
        }
    }
)

export const updateCart = createAsyncThunk(
    'cartSlice/updateCartItems',
    async (obj) => {
        try {
            const data = await fetch(`${baseUrl}/cart/cartItem`, {
                method: 'PUT',
                credentials: 'include',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'                    
                },    
                body: JSON.stringify({items: obj})
            })
            const {status} = data;
            const json = await data.json();
            json['httpStatus'] = status
            return json;
        } catch (err){
            console.log(err)
        }
    }
)

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        cartErrored: false,
        cartLoading: false,
        cartItemsLoading: false,
        cartItemsError: false,
        cartItemsUpdatedLoading: false,
        cartItemsUpdatedErrored: false,
        redirectRequired: false,
        cartItemsUpdated: false,
        cartItems: [],
        cartId: null,
        errorMsg: ''
    },
    reducers: {
        updateItemQuantity: (state, action) => {
            const {payload} = action;
            state.cartItems[payload.arrayIteration].quantity += payload.diff
            state.cartItems[payload.arrayIteration].totalProductPrice += (payload.diff * state.cartItems[payload.arrayIteration].price)
        },
        resetUpdateStatus: (state) => {
            state.cartItemsUpdated = false;
        }
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
        },
        [getCartItems.pending]: (state, action) => {
            state.cartItemsLoading = true;
            state.cartItemsError = false
        },
        [getCartItems.fulfilled]: (state, action) => {
            state.cartItemsLoading = false;
            if(action.payload.httpStatus === 403){
                state.redirectRequired = true
            }
            if(action.payload.status === 1){ 
                state.cartItems = action.payload.message
            } else {
                state.cartItemsError = true;
                state.errorMsg = action.payload.message
            }
        },
        [getCartItems.rejected]: (state, action) => {
            state.cartItemsErrored = true;
            state.cartItemsLoading = false;
        },

        [updateCart.pending]: (state, action) => {
            state.cartItemsUpdatedLoading = true;
            state.cartItemsUpdatedErrored = false
        },
        [updateCart.fulfilled]: (state, action) => {
            state.cartItemsUpdatedErrored = false;
            state.cartItemsLoading = false;
            if(action.payload.httpStatus === 403){
                state.redirectRequired = true
            }
            if(action.payload.status === 1){
                state.cartItemsUpdated = action.payload.message.find(e => e === true) ? true : false
                console.log(state.cartItemsUpdated)
            } else {
                state.cartItemsUpdatedErrored = true;
                state.cartItemsUpdated = action.payload.message
            }
        },
        [updateCart.rejected]: (state, action) => {
            state.cartItemsUpdatedErrored = true;
            state.cartItemsUpdatedLoading = false;
        }        
    }
})

export const userCartId = (state) => state.cartSlice.cartId;
export const cartItemsLoading = (state) => state.cartSlice.cartItemsLoading;
export const cartItemsErrored = (state) => state.cartSlice.cartItemsErrored;
export const loadingCart = (state) => state.cartSlice.cartLoading;
export const erroredCart = (state) => state.cartSlice.cartErrored;
export const cartItems = (state) => state.cartSlice.cartItems;
export const redirectRequired = (state) => state.cartSlice.redirectRequired;
export const cartUpdated = (state) => state.cartSlice.cartItemsUpdated;
export const cartItemsUpdatedLoading = (state) => state.cartSlice.cartItemsUpdatedLoading;
export const cartItemsUpdatedErrored = (state) => state.cartSlice.cartItemsUpdatedErrored;
export const {updateItemQuantity} = cartSlice.actions;
export const {resetUpdateStatus} = cartSlice.actions

export default cartSlice.reducer;