import React, { useContext, useEffect } from 'react';

import './UserModal.css';
import AUX from '../Auxiliary/Auxiliary'
import { UserModalContext } from '../../App';
import UserCard from './UserCard/UserCard';

import CancelIcon from '@material-ui/icons/Cancel';
import { UserCardContext } from '../../pages/UserManagement';

const UserModal = (props) => {

    const [customerPhone, setCustomerPhone, merchantPhone, setMerchantPhone, userType, setUserType, userData, setUserData] = useContext(UserCardContext);
    const [showUserModal, setShowUserModal] = useContext(UserModalContext);


    useEffect(() => {
        
        return () => {
            setCustomerPhone(null);
            setMerchantPhone(null);
            setUserData(null)
        }
    }, [])

    return (
        <AUX>
            {showUserModal ? <div className="Backdrop" onClick={() => setShowUserModal(false)} ></div> : null}

            <div className="UserModal"
                style={{
                    transform: showUserModal ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: showUserModal ? '1' : '0'
                }}>

                <span onClick={() => setShowUserModal(false)}>
                    <CancelIcon />
                </span>

                <UserCard />
            </div>
        </AUX>)
}

export default UserModal;