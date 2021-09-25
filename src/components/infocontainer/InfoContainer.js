import { useState } from "react";
import { useEffect } from "react";
import './infocontainer.css'

export default function ErrorContainer(match){

    const [infoMsg, setInfoMsg] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const {infoMsg} = match;
        const {error} = match;
        setInfoMsg(infoMsg)
        setIsError(error);
    }, [match]);

    return (
        <div>
        {   infoMsg.length 
            ?
            <div className={isError === false ? 'infoContainer' : 'errorContainer'} >
                {infoMsg ? infoMsg : ''}
            </div> 
            :
            ''              
        }
        </div>
    )

}