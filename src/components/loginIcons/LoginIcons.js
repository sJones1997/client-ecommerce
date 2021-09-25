import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import {baseUrl} from '../../app/App';
import './loginIcons.css'
export default function loginIcons(){
    return (
        <div className="google">
            <a href={`${baseUrl}/auth/google`}>
                <FontAwesomeIcon icon={faGoogle} />
            </a>
        </div>      
    )
}