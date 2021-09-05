import {useState} from 'react'
import { Link } from 'react-router-dom';
import {submitCredentials} from './registerSlice';
import './register.css';
import { useDispatch } from 'react-redux';


export default function Register(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

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
            <div className="formContainer">
                <h1>Sign up below</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" name="username" onChange={handleUserNameChange} value={username} placeholder="Username" required/>
                    <input type="password" name="password" onChange={handlePasswordChange} value={password} placeholder="Password" required />
                    <input type="password" name="passwordConfirm" onChange={handlePasswordConfirmChange} value={confirmPassword} placeholder="Confirm password" required />
                    <input type="submit" value="Submit" />
                </form>
                <div className="login-prompt">
                    <p>Already have an accout? <Link to='/login'>Sign in here</Link></p>
                </div>                
            </div>
        </div>
    )
}