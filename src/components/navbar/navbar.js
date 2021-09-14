
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './navbar.css';
import { logout, killSession } from './navbarSlice';

export default function Navbar(){
    
    const dispatch = useDispatch();
    const history = useHistory();
    const userLogout = async () =>{
        dispatch(logout());
        await dispatch(killSession());
        history.push('/login')
    }

    return (
        <div className="navbarContainer">
            <div className="logo">
                <h2>Logo here</h2>
            </div>
            <ul>
                <li>Home</li>
                <li>Orders</li>
                <li>Cart</li>
                <li onClick={userLogout}>Logout</li>
            </ul>
        </div>
    )
}