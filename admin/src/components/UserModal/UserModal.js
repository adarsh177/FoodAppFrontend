import React, { useContext } from 'react';

import './UserModal.css';
import AUX from '../Auxiliary/Auxiliary'
import { ModalContext } from '../../App';
import UserCard from './UserCard/UserCard';

const UserModal = () => {

    const [showModal, setShowModal] = useContext(ModalContext);

    
    return (
        <AUX>
            { showModal ? <div className="Backdrop" onClick={() => setShowModal(false)} ></div> : null}
            
            <div className="UserModal"
                style={{
                    transform: showModal ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: showModal ? '1' : '0'
                }}>

                <UserCard/>
            </div>
        </AUX>)
}

export default UserModal;