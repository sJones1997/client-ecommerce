import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons"
import {baseUrl} from '../../app/App';
import './loginIcons.css'
export default function loginIcons(){
    return (
        <div className="icons">
            <div className="google">
                <a href={`${baseUrl}/auth/google`}>
                    <FontAwesomeIcon icon={faGoogle} />
                </a>
            </div>
            <div className="facebook">
                <a href={`${baseUrl}/auth/facebook`}>
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
            </div>  
            <div className="github">
                <a href={`${baseUrl}/auth/github`}>
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </div>                                                             
        </div>        
    )
}