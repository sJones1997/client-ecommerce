import { Redirect, useHistory } from "react-router";
import './notfound.css'

export default function NotFound(){

    const history = useHistory();

    const returnToDashboard = () => {
        history.push('/')
    } 
    return (
        <div className="notFoundContainer">
            <h2>Nothing to see here!</h2>
            <h3><a onClick={returnToDashboard}>Take me home</a></h3>
        </div>
    )
}