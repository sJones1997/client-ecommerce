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
    redirectRequired,
    updateItemQuantity,
    updateCart,
    cartUpdated,
    cartItemsUpdatedLoading,
    cartItemsUpdatedErrored,
    resetUpdateStatus
} from "./cartSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import Checkout from "../../components/checkout/Checkout";
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import './cart.css'
import { useState } from "react";
import InfoContainer from '../../components/infocontainer/InfoContainer';

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
    const [updateCartButtonDisabled, setUpdateCartButtonDisabled] = useState(true);
    const cartHasUpdated = useSelector(cartUpdated);
    const cartUpdatedLoading = useSelector(cartItemsUpdatedLoading);
    const cartUpdatedErrored = useSelector(cartItemsUpdatedErrored);

    useEffect(() => {
        dispatch(getUserCart());
        dispatch(resetUpdateStatus())
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

    const handleProductIncrease = (id, i) => {  
        dispatch(updateItemQuantity({"id": id, "diff": 1, arrayIteration: i}))
        setUpdateCartButtonDisabled(false)
    }

    const handleProductDecrease = (id, i, quantity) => {
        if(quantity !== 0){
            dispatch(updateItemQuantity({"id": id, "diff": -1, arrayIteration: i}))
        }
        setUpdateCartButtonDisabled(false)      
    }        

    const handleUpdateSubmit = async (e) => { 
        await dispatch(updateCart(items));
        await dispatch(getCartItems({id: cartId}))     
        setUpdateCartButtonDisabled(true)               
    }

    const getCartPrice = (items) => {
        let total = 0;
        items.forEach(e => {
            total += e['totalProductPrice']
        })
        return total;
    } 

    const handleQuantity = (quantity) => {
        return quantity
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
                                        <h2>{e.name} ({handleQuantity(e.quantity)})</h2>
                                        <div className="itemOptions">
                                            <div className="add" onClick={() => {handleProductIncrease(e.id, i)}}>
                                                <span><FontAwesomeIcon icon={faPlus} /></span>
                                            </div>
                                            <div className="minus" onClick={() => {handleProductDecrease(e.id, i, e.quantity)}}>
                                                <span disabled><FontAwesomeIcon icon={faMinus} /></span>
                                            </div>
                                        </div>                        
                                    </div>
                                    <div className="accumulativePrice">
                                            <h2>£{e.price * e.quantity}</h2>
                                    </div>
                                </div>
                                <div>
                                    {items.length - 1 !== i ? <hr/> : ''}
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
                    <h2 style={{textAlign: 'center'}}>Cart Empty</h2>
                </div>    
            }
            <div class="cartInfoContainer">
                {cartHasUpdated && !(cartUpdatedLoading && cartUpdatedErrored) ? <InfoContainer infoMsg={'Cart updated'} error={false} /> : ''}                  
            </div>
        </div>
    )
}