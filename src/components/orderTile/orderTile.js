import { useState } from "react";
import { useEffect } from "react";
import './orderTile.css'
export default function OrderTile(match){

    const [order, setOrder] = useState({});

    useEffect(() => {
        const {orderDetails} = match;
        setOrder(orderDetails);
    }, [match, order])
    
    const getOrderTotalPrice = (order) => {
        let total = 0;
        order.forEach(e => {
            total += e.price * parseInt(e.count)
        })
        return total;
    }     

    const getDate = (date) => {
        const d = new Date(date);
        const month = d.getMonth().toString().length === 1 ? `0${d.getMonth()}` : d.getMonth() 
        return `${d.getDate()}-${month}-${d.getFullYear()}`
    }

    return (
        <div className="orderTile">
            {
                Object.keys(order).length
                ?
                <div>
                    {order.map((e, i) => (
                        <div key={`orderTile_${i}`}>
                            <div className="orderItem">
                                <h2>{e.name} ({e.count})</h2>
                                <h2>£{e.price * parseInt(e.count)}</h2>
                            </div>
                            <div>
                                {i !== Object.keys(order).length -1 ? <hr /> : ''}                            
                            </div>
                        </div>
                    ))}
                    <div className="orderTotal">
                        <h3>Order placed: {getDate(order[0].createdAt)}</h3>
                        <h2>Total price: £{Object.keys(order).length > 1 ? getOrderTotalPrice(order) : order[0].price * parseInt(order[0].count)}    </h2>                    
                    </div>
                </div>
                :
                <h1>help</h1>
            }
        </div>
    );

}