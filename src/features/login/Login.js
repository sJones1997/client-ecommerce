import LoginIcons from '../../components/loginIcons/LoginIcons';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './login.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { errorMsg, submitCredentials, successfulLogin, sessionCheck, checkForSession} from './loginSlice';
import ErrorContainer from '../../components/errorcontainer/ErrorContainer';
import { useEffect } from 'react';
export default function Login(){


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const sessionActive = useSelector(sessionCheck);
    const errorMessage = useSelector(errorMsg);
    const loginSuccessful = useSelector(successfulLogin);
    const dispatch = useDispatch();

    const handleUserNameChange = e => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(submitCredentials({username: username, password: password}))
    }

    useEffect(() => {
        dispatch(checkForSession())
        if(sessionActive){
            history.push("/")
        }
    }, [sessionActive, dispatch, history])

    if(loginSuccessful){
        return (
            <Redirect to='/'/>
        )
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