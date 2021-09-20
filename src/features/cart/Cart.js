import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserCart, userCartId, getCartItems } from "./cartSlice"

export default function Cart(){

    const dispatch = useDispatch()
    const cartId = useSelector(userCartId);

    useEffect(() => {
        dispatch(getUserCart());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getCartItems({id: cartId}))
    }, [cartId, dispatch])

    return (
        <div className="cartContainer">

        </div>
    )
}