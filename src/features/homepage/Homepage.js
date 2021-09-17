import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Navbar from "../../components/navbar/navbar";
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
    },[])

    useEffect(() => {
        if(redirectRequired){
            dispatch({action:null, type:'navbarSlice/logout'})
            history.push('/login');
        }
    }, [redirectRequired, dispatch, history])

    let content;
    if(!(productsLoading && productsErrored) && typeof(products) === 'object'){
        content = products.map((e, i) => (
            <div className="productContainer" key={i}>
                <h2>{e.name}</h2>
                <p>{e.description}</p>
                <p>£{e.price}</p>
            </div>
        ))
    } else {
        content = <h1 className="productContentError">{products}</h1>
    }

    return (
        <div className="homepageContainer">
            <header>
                <Navbar />
            </header>                       
            <div className="productsContainer">
                {content}
            </div>
        </div>
    )
}