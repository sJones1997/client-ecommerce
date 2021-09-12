import { useState } from "react";
import { useEffect } from "react";
import './errorcontainer.css'

export default function ErrorContainer(match){

    const [errorMsg, setErrorMsg] = useState();

    useEffect(() => {
        const {errorMsg} = match;
        setErrorMsg(errorMsg)
    }, [match]);

    return (
        <div className="errorContainer">
            {errorMsg ? errorMsg : ''}
        </div>
    )

}