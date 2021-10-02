import {useState, useEffect} from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
import {submitCredentials, errorMsg, successfulReg, resetMsg} from './registerSlice';
import './register.css';
import { useDispatch, useSelector } from 'react-redux';
import LoginIcons from '../../components/loginIcons/LoginIcons';
import InfoContainer from '../../components/infocontainer/InfoContainer';
import { checkForSession, sessionCheck } from '../login/loginSlice';


export default function Register(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const sessionActive = useSelector(sessionCheck);
    const regSuccess = useSelector(successfulReg);
    const errorMessage = useSelector(errorMsg);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetMsg())
    }, [dispatch])

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

    useEffect(() => {
        dispatch(checkForSession())
        if(sessionActive){
            history.push("/")
        }
    }, [sessionActive, dispatch, history]);
    
    if(regSuccess){
        return (
            <Redirect to='/'/>
        )        
    }

    return (
        <div className="registerContainer">
            {regSuccess === false ? <InfoContainer infoMsg={errorMessage} error={true} /> : '' }
            <div className="formContainer">
                <h1>Create an account</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" name="username" minLength="3" onChange={handleUserNameChange} value={username} placeholder="Username" required/>
                    <input type="password" name="password" minLength="8" onChange={handlePasswordChange} value={password} placeholder="Password" required />
                    <input type="password" name="passwordConfirm" minLength="8" onChange={handlePasswordConfirmChange} value={confirmPassword} placeholder="Confirm password" required />
                    <div>
                        <input type="submit" value="Submit" />  
                        <LoginIcons />                                          
                    </div>
                </form>
                <div className="loginPrompt">
                    <p>Already have an accout? <Link to='/login'>Sign in here</Link></p>
                </div>                
            </div>
        </div>
    )
}