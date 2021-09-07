import React from 'react';
import Dinero from 'dinero.js';
import { useHistory } from 'react-router';

import './SingleOrderHistory.css';

function SingleOrderHistory(props) {


    const linkStack = useHistory();

    return (
        <div className="SingleOrderHistory" >
            <div className="OrderHis_Left">
                <h3>#{props.orderDetails && props.orderDetails._id}</h3>
                <p>Ordered At: {props.orderDetails && new Date(props.orderDetails.timeOfOrder).toLocaleDateString()}</p>
            </div>
            <div className="OrderHis_Right">

                <span>
                    {Dinero(props.orderDetails && props.orderDetails.finalValue).getCurrency() === 'INR' ? '₹' : "$"}{' '}
                    {Dinero(props.orderDetails && props.orderDetails.finalValue).toUnit()}
                </span>
            </div>
        </div>
    )
}

export default SingleOrderHistory
