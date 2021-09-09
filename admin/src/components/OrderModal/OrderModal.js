import React, { useContext, useEffect, useState } from 'react';

import './OrderModal.css';
import AUX from '../Auxiliary/Auxiliary'
import { OrderModalContext } from '../../App';
import OrderCard from './OrderCard/OrderCard';
import { useParams } from 'react-router';
import { GetOrderDetails } from '../../APIs/OrderManager';

import CancelIcon from '@material-ui/icons/Cancel';

import CircularProgress from '@material-ui/core/CircularProgress';


const OrderModal = () => {

    const [showOrderModal, setShowOrderModal, singleOrderId, setSingleOrderId] = useContext(OrderModalContext)
    const [Order, setOrder] = useState();

    useEffect(() => {
        if(!singleOrderId) return;

        setShowOrderModal(true);

        GetOrderDetails(singleOrderId).then(order => {
            setOrder(order);
        }).catch(err => {
            console.log(err);
            alert("Error occured while fetching order!");
        })

        return () => {
            singleOrderId(null);
        }

    }, [])

    
    return (
        <AUX>
            { showOrderModal ? <div className="Backdrop" onClick={() => setShowOrderModal(false)} ></div> : null}
            
            <div className="OrderModal"
                style={{
                    transform: showOrderModal ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: showOrderModal ? '1' : '0'
                }}>

                    
                <span onClick={()=> setShowOrderModal(false)}>
                    <CancelIcon />
                </span>

               {Order? <OrderCard order={OrderModal} /> :  <CircularProgress disableShrink />}
            </div>
        </AUX>)
}

export default OrderModal;