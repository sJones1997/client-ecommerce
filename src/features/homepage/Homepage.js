import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Navbar from "../../components/navbar/navbar";
import { loadProducts, redirect } from "./homepageSlice";

export default function Homepage(){
    const dispatch = useDispatch();
    const redirectRequired = useSelector(redirect)
    const history = useHistory();
    useEffect(() => {
        dispatch(loadProducts());
    },[])

    useEffect(() => {
        if(redirectRequired){
            dispatch({action:null, type:'navbarSlice/logout'})
            history.push('/login');
        }
    }, [redirectRequired])

    return (
        <div className="homepageContainer">
            <header>
                <Navbar />
            </header>                       
            <div className="productsContainer">
                <h1>hello</h1>
            </div>
        </div>
    )
}