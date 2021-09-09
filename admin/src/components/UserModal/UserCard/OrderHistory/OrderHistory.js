import React, { useState, useEffect, useContext } from 'react';
import { GetCustomerOrders, GetMerchantOrders } from '../../../../APIs/AdminManager';
import SingleOrderHistory from './SingleOrderHistory/SingleOrderHistory';


import './OrderHistory.css'
import { UserCardContext } from '../../../../pages/UserManagement';
import { IsUserCardLoading } from '../UserCard';



function OrderHistory() {
    
    const  [isUserCardLoading, setIsUserCardLoading] = useContext(IsUserCardLoading);
    const [customerPhone, setCustomerPhone, merchantPhone, setMerchantPhone, userType, setUserType, userData, setUserData] = useContext(UserCardContext)
    const [Orders, setOrders] = useState();

    useEffect(() => {
        
        if(!userData) {
            alert("Unable to fetch data!");
            return
        }
        if (userType === 'merchant') {
            setIsUserCardLoading(true);

            GetMerchantOrders(userData.userId).then(orders => {
                console.log(orders.length);
                (orders.length < 1) ? alert("No orders till now!"): null;
                setOrders([...orders]);
                setIsUserCardLoading(false);

            })
                .catch(err => { alert(err) });
        }
        else if(userType === 'customer')  {
            setIsUserCardLoading(true);

            GetCustomerOrders(userData.userId).then(orders => {
                (orders.length < 1) ? alert("No orders till now!"): null;
                setOrders([...orders]);
                setIsUserCardLoading(false);

            })
                .catch(err => { alert(err) });
        }
    }, []);


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
