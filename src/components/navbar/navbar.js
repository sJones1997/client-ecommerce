import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './navbar.css';
import { logoutUser, successfulLogout } from './navbarSlice';

export default function Navbar(){

    const dispatch = useDispatch();
    const logoutSuccessful = useSelector(successfulLogout);
    const history = useHistory();
    const logout = () =>{
        console.log("clicked")
        dispatch(logoutUser())     
    }

    useEffect(() => {
        console.log(logoutSuccessful)
        if(logoutSuccessful === true){
            history.push('/login');
        }
    }, [logoutSuccessful,history])

    return (
        <div className="navbarContainer">
            <div className="logo">
                <h2>Logo here</h2>
            </div>
            <ul>
                <li>Home</li>
                <li>Orders</li>
                <li>Cart</li>
                <li onClick={logout}>Logout</li>
            </ul>
        </div>
    )
}