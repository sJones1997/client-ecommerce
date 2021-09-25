
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
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
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/orders'>Orders</Link></li>
                <li><Link to='/cart'>Cart</Link></li>
                <li onClick={userLogout}>Logout</li>
            </ul>
        </div>
    )
}