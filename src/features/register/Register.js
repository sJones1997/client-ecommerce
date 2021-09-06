import {useState} from 'react'
import { Link } from 'react-router-dom';
import {submitCredentials} from './registerSlice';
import './register.css';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons"

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
                <div className="icons">
                    <div className="google">
                        <a href="http://localhost:3000/api/auth/google">
                            <FontAwesomeIcon icon={faGoogle} />
                        </a>
                    </div>
                    <div className="facebook">
                        <a href="http://localhost:3000/api/auth/google">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                    </div>  
                    <div className="github">
                        <a href="http://localhost:3000/api/auth/google">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </div>                                                         
                </div>
                <div className="loginPrompt">
                    <p>Already have an accout? <Link to='/login'>Sign in here</Link></p>
                </div>                
            </div>
        </div>
    )
}