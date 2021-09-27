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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
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
    const [updateCart, setUpdateCart] = useState([]);    
    const [updateCartButtonDisabled, setUpdateCartButtonDisabled] = useState(true);

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

    const handleProductIncrease = (id) => {
        console.log(updateCart.length)
        let cart = updateCart;
        cart.push({"id": id, "diff": 1})
        setUpdateCartButtonDisabled(false)
        setUpdateCart(cart);
    }

    const handleProductDecrease = (id) => {
        let cart = updateCart;
        cart.push({"id": id, "diff": -1})
        setUpdateCartButtonDisabled(false)
        setUpdateCart(cart);
    }        

    const handleUpdateSubmit = (e) => {
        let update = updateCart.reduce((accu, prev) => {
            return {id: prev['id'], diff: accu['diff'] + prev['diff']}
        })
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
                        <div key={i}>
                            {Object.keys(e).length 
                            ? 
                            <div className="product">
                                <div className="details">
                                    <div className="info">
                                        <h2>{e.name} ({e.quantity})</h2>
                                        <div className="itemOptions">
                                            <div className="add" onClick={() => {handleProductIncrease(e.id)}}>
                                                <span><FontAwesomeIcon icon={faPlus} /></span>
                                            </div>
                                            <div className="minus" onClick={() => {handleProductDecrease(e.id)}}>
                                                <span><FontAwesomeIcon icon={faMinus} /></span>
                                            </div>
                                        </div>                        
                                    </div>
                                    <div className="accumulativePrice">
                                            <h2>£{e.price * e.quantity}</h2>
                                    </div>
                                </div>
                                <div>
                                    <hr />
                                </div>
                            </div>      
                            :
                            ''      
                            }

                        </div>               
                    ))}  
                    <div className="checkoutContainer">
                        <button className="checkout" onClick={handlePaymentContainer}>Checkout</button>
                        <button className={!updateCartButtonDisabled ? 'updateCart' : 'updateCartDisabled'} disabled={updateCartButtonDisabled} onClick={handleUpdateSubmit}>Update cart</button>
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
                        <button disabled={true}>Checkout</button>
                        <h2>Total price: £0</h2>
                    </div>
                </div>    
            }

        </div>
    )
}