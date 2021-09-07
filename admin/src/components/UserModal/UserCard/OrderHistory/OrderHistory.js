import React, { useState, useEffect } from 'react';
import { GetMerchantOrders } from '../../../../APIs/AdminManager';
import SingleOrderHistory from './SingleOrderHistory/SingleOrderHistory';

import './OrderHistory.css'
function OrderHistory() {

    const [Orders, setOrders] = useState();

    useEffect(() => {
        GetMerchantOrders("U6mWsqyFzgSHQaYozREIwS77MIp1").then(orders=> {
            console.log(orders);
            setOrders([...orders]);
        })
            .catch(err=> {alert(err)});
    }, [])
    return (
        <div className="OrderHistory">
            {Orders && 
                Orders.map(order => {
                    console.log(order);
                    return (<SingleOrderHistory key={order._id} orderDetails={order} />)
                })
            }
            
        </div>
    )
}

export default OrderHistory
