import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { createPaymentIntent, 
  clientSecret, 
  orderPlaced, 
  placeOrder, 
  resetOrderStatus,
  redirectRequired } from "./checkoutSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import './checkout.css'


export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const secret = useSelector(clientSecret);
  const orderSuccess = useSelector(orderPlaced);
  const stripe = useStripe();
  const redirect = useSelector(redirectRequired)
  const elements = useElements();
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    dispatch(createPaymentIntent())
  }, [dispatch]);

  useEffect(() => {
    if(redirect){
      dispatch({action:null, type:'navbarSlice/logout'})
      history.push('/login');            
  }
  },[redirect, history, dispatch])

  useEffect(() => {
    if(orderSuccess){
      dispatch(resetOrderStatus())
      history.push('/orders');
    }
  }, [orderSuccess, history, dispatch])


  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      button: {
        backgroundColor:'red'
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(secret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      dispatch(placeOrder())
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
        className={!disabled ? 'payButton' : 'payButtonDisabled'}
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
    </form>
  );
}
