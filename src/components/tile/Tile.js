import { useState } from "react";
import { useEffect } from "react";
import './tile.css'

export default function Tile(match){
    const [details, setDetails] = useState({});
    const [underline, setUnderline] = useState(true);
    useEffect(() => {
        const {productDetails, underlineRequired} = match;
        setDetails(productDetails);
        setUnderline(underlineRequired);
    },[match])

    return (
        <div className="tileContainer">
            {Object.keys(details).length 
            ? 
            <div className="product">
                <div className="details">
                    <div className="info">
                        <h2>{details.name} ({details.quantity})</h2>
                    </div>
                    <div className="accumulativePrice">
                            <h2>£{details.price * details.quantity}</h2>
                    </div>
                </div>
                <div>
                    { underline ? <hr />  : '' }
                </div>
            </div>      
            :
            ''      
            }

        </div>
    )

}