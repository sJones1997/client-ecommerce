import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import { getProductDetails, productLoading, productErrored, redirect, productDetails, addToCart, cartUpdated } from "./productPageSlice";
import InfoContainer from '../../components/infocontainer/InfoContainer';
import './productPage.css';
import { useState } from "react";

export default function ProductPage(){

    const {id} = useParams();
    const dispatch = useDispatch()
    const loadingProduct = useSelector(productLoading);
    const errorProduct = useSelector(productErrored);
    const cartUpdatedMsg = useSelector(cartUpdated);
    const redirectRequired = useSelector(redirect);
    const prodDetail = useSelector(productDetails)
    const history = useHistory();

    const [orderQuantity, setOrderQuantity] = useState(1);

    const changeQuantity = (e) => {
        setOrderQuantity(e.target.value);
    }

    useEffect(() => {
        dispatch(getProductDetails({id:id}));
    }, [id, dispatch]);

    useEffect(() => {
        if(redirectRequired){
            dispatch({action: null, type:'navbarSlice/logout'});
            history.push('/login');
        }
    }, [dispatch, redirectRequired, history]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(id) 
        console.log(orderQuantity);
        dispatch(addToCart({productId: parseInt(id), orderQuantity: orderQuantity}))
    }

    return (
        <div className="productItemContainer">
            {cartUpdatedMsg.length ? <InfoContainer infoMsg={cartUpdatedMsg} error={false} /> : ''}
            {
                (!(loadingProduct && errorProduct))
                ?
                <div className="productItem">
                    <div className="productDetails">
                        <div className="productItemHeader">
                            <h1 className="productTitle">{prodDetail.name}</h1>
                            <h1 className="productPrice">£{prodDetail.price}</h1>
                        </div>
                        <h3 className="productDescription">{prodDetail.description}</h3>                     
                    </div>
                    <div className="productOrder">
                        <form onSubmit={(e) => {handleSubmit(e)}}>
                            <div>
                                <p>Order quantity:</p>
                                <input type="number" name="quantity" value={orderQuantity} onChange={changeQuantity}  min="1" max={prodDetail.stock} required />                                
                            </div>
                            <input type="submit" value="Add to cart"/>
                        </form>   
                    </div>
                </div>
                :
                <div>
                    <h1>Problem loading content</h1>
                </div>
            }
        </div>
    )
}