import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {getOrders, allOrders, ordersLoading, ordersErrored, redirectRequired} from './ordersSlice';
import OrderTile from '../../components/orderTile/orderTile';
import './orders.css'

export default function Orders(){

    const dispatch = useDispatch();
    const orders = useSelector(allOrders);
    const loading = useSelector(ordersLoading);
    const errored = useSelector(ordersErrored);
    const redirect = useSelector(redirectRequired);
    const history = useHistory();

    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch])

    useEffect(() => {
        console.log(redirect)
        if(redirect){
            dispatch({action: null, type:'navbarSlice/logout'});
            history.push('/login');
        }
    }, [dispatch, redirect, history]);

    return (
        <div className="ordersContainer">
            {
                (!(loading && errored) && orders !== undefined)
                ?
                <div className="orders">
                    {orders.map((e,i) => (
                        <OrderTile key={`order_${i}`} orderDetails={e} />
                    ))}
                </div>
                :
                <h1>help</h1>
            }

        </div>
    )
}