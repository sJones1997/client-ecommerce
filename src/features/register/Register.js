import {useState, useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import {submitCredentials, errorMsg, successfulReg} from './registerSlice';
import './register.css';
import { useDispatch, useSelector } from 'react-redux';
import { checkForSession } from '../../helpers/globalHelpers';
import LoginIcons from '../../components/loginIcons/LoginIcons';
import ErrorContainer from '../../components/errorcontainer/ErrorContainer';

export default function Register(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const location = useLocation();
    const history = useHistory();
    const regSuccess = useSelector(successfulReg);
    const errorMessage = useSelector(errorMsg);
    const dispatch = useDispatch();

    useEffect(() => {
        async function checkSession(){
            const {status} = await checkForSession(location.pathname);
            console.log(status)
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

    const handlePasswordConfirmChange = e => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(submitCredentials({username: username, password: password, confirmPassword: confirmPassword}));
    }

    return (
        <div className="registerContainer">
            {regSuccess === false ? <ErrorContainer errorMsg={errorMessage} /> : '' }
            <div className="formContainer">
                <h1>Create an account</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" name="username" onChange={handleUserNameChange} value={username} placeholder="Username" required/>
                    <input type="password" name="password" onChange={handlePasswordChange} value={password} placeholder="Password" required />
                    <input type="password" name="passwordConfirm" onChange={handlePasswordConfirmChange} value={confirmPassword} placeholder="Confirm password" required />
                    <input type="submit" value="Submit" />
                </form>
                <LoginIcons />
                <div className="loginPrompt">
                    <p>Already have an accout? <Link to='/login'>Sign in here</Link></p>
                </div>                
            </div>
        </div>
    )
}