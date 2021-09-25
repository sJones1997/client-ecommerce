import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { getUserCart, 
    userCartId, 
    getCartItems, 
    cartItemsErrored, 
    cartItemsLoading, 
    cartItems, 
    loadingCart, 
    erroredCart, 
    redirectRequired 
} from "./cartSlice"
import Tile from "../../components/tile/Tile";
import Checkout from "../../components/checkout/Checkout";
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import './cart.css'
import { useState } from "react";

const stripePromise = loadStripe('pk_test_51Jc8LAHvZfJpjWvjNnm6DOgxrtwa8wzLY783IUsA1i0CLnYQlvUlt5Ec5oVI9hX6jce9Atzngb4MVtQIK0XWBtjv00kvjvIfAX');

export default function Cart(){

    const dispatch = useDispatch();
    const history = useHistory();
    const [showPayment, setShowPayment] = useState(false);
    const cartId = useSelector(userCartId);
    const itemsLoading = useSelector(cartItemsLoading);
    const itemsErrored = useSelector(cartItemsErrored);
    const cartLoading = useSelector(loadingCart);
    const cartErroed = useSelector(erroredCart);
    const items = useSelector(cartItems);
    const redirect = useSelector(redirectRequired);

    useEffect(() => {
        dispatch(getUserCart());
    }, [dispatch]);

    useEffect(() => {
        if(redirect){
            dispatch({action:null, type:'navbarSlice/logout'})
            history.push('/login');            
        }
    }, [redirect, dispatch, history])

    useEffect(() => {
        if(!(cartLoading && cartErroed) && cartId !== null){
            dispatch(getCartItems({id: cartId}))            
        }
    }, [cartId, dispatch, cartLoading, cartErroed])

    const handlePaymentContainer = () => {
        let setPayment = showPayment;
        setShowPayment(setPayment = !setPayment)
    } 

    const getCartPrice = (items) => {
        let total = 0;
        items.forEach(e => {
            total += e['totalProductPrice']
        })
        return total;
    } 

    return (
        <div className="cartContainer">
            {
                (items.length && !(itemsLoading && itemsErrored))
                ?
               <div className="cart">
                    {items.map((e, i) => (
                        <Tile key={i} productDetails={e} underlineRequired={i + 1 === items.length ? false : true} />                    
                    ))}  
                    <div className="checkout">
                        <button onClick={handlePaymentContainer}>Checkout</button>
                        <h2>Total price: £{getCartPrice(items)}</h2>
                    </div> 
                    <div className={showPayment ? 'paymentContainer' : 'paymentContainerHide'}>
                        <Elements stripe={stripePromise}>
                            <Checkout checkoutItems={items}/>
                        </Elements>
                    </div>                 
               </div>               
                :
                <div className="cart">
                    <div className="checkoutDisabled">
                        <button disabled={true} onClick={handlePaymentContainer}>Checkout</button>
                        <h2>Total price: £0</h2>
                    </div>
                </div>    
            }

        </div>
    )
}