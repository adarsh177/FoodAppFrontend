import React, { useContext } from 'react';

import './OrderModal.css';
import AUX from '../Auxiliary/Auxiliary'
import { ModalContext } from '../../App';
import OrderCard from './OrderCard/OrderCard';

const OrderModal = () => {

    const [showModal, setShowModal] = useContext(ModalContext);

    
    return (
        <AUX>
            { showModal ? <div className="Backdrop" onClick={() => setShowModal(false)} ></div> : null}
            
            <div className="OrderModal"
                style={{
                    transform: showModal ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: showModal ? '1' : '0'
                }}>

                <OrderCard/>
            </div>
        </AUX>)
}

export default OrderModal;