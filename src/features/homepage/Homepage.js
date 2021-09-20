import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { loadProducts, redirect, productLoading, productErrored, allProducts } from "./homepageSlice";
import './homepage.css';

export default function Homepage(){
    const dispatch = useDispatch();
    const redirectRequired = useSelector(redirect);
    const productsLoading = useSelector(productLoading);
    const productsErrored = useSelector(productErrored);
    const products = useSelector(allProducts);
    const history = useHistory();

    useEffect(() => {
        dispatch(loadProducts());
    },[dispatch])

    useEffect(() => {
        if(redirectRequired){
            dispatch({action:null, type:'navbarSlice/logout'})
            history.push('/login');
        }
    }, [redirectRequired, dispatch, history]);

    const loadProductPage = (productId) => {
        const uri = `/product/${productId}`;
        history.push(uri);
    }

    let content;
    if(!(productsLoading && productsErrored) && typeof(products) === 'object'){
        content = products.map((e, i) => {
            return (<div className="productContainer" onClick={() => {loadProductPage(e.id)}} key={i}>
                <div className="productHeader">
                <h2 className="productTitle">{e.name}</h2>
                <h3 className="productPrice">£{e.price}</h3>
                </div>
                <p className="productDescription">{e.description}</p>
            </div>)
        })
    } else {
        content = <h1 className="productContentError">{products}</h1>
    }

    return (
        <div className="homepageContainer">                     
            <div className="productsContainer">
                {content}
            </div>
        </div>
    )
}