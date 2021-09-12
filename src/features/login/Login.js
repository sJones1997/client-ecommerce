import LoginIcons from '../../components/loginIcons/LoginIcons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './login.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkForSession } from '../../helpers/globalHelpers';
import {errorMsg, submitCredentials, successfulLogin} from './loginSlice';
import ErrorContainer from '../../components/errorcontainer/ErrorContainer';
import { useEffect } from 'react';
export default function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const location = useLocation();
    const errorMessage = useSelector(errorMsg);
    const loginSuccessful = useSelector(successfulLogin);
    const dispatch = useDispatch();

    useEffect(() => {
        async function checkSession(){
            const {status} = await checkForSession(location.pathname);
            if(status === 1){
                history.push('/home')
            }             
        } 
        checkSession()
    }, [history, location.pathname])

    const handleUserNameChange = e => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(submitCredentials({username: username, password: password}));
    }    

    return (
        <div>
            <div className="loginContainer">
                {loginSuccessful === false ? <ErrorContainer errorMsg={errorMessage} /> : '' }
                <div className="formContainer">
                    <h1>Sign in below</h1>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input type="text" name="username" value={username} onChange={handleUserNameChange} placeholder="Username" required />
                        <input type="password" name="password" value={password} onChange={handlePasswordChange} placeholder="Password" required />
                        <input type="submit" />
                    </form>
                    <LoginIcons />
                    <div className="registerPrompt">
                        <p>New here? <Link to='/register'>Create an account</Link></p>
                    </div>                      
                </div>
            </div>
        </div>
    )
}