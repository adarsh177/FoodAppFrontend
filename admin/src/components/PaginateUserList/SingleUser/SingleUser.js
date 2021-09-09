import React, { useContext } from 'react';
import { UserModalContext } from '../../../App';
import { UserCardContext } from '../../../pages/UserManagement';
import './SingleUser.css';

function SingleUser(props) {

    const [customerPhone, setCustomerPhone, merchantPhone, setMerchantPhone, userType, setUserType, userData, setUserData] = useContext(UserCardContext);

    const [showUserModal, setShowUserModal] = useContext(UserModalContext);

    const clicked = () => {
        console.log("clicked" + userType);
        if(userType === 'merchant') setMerchantPhone(props.user && props.user.phone);
        else setCustomerPhone(props.user && props.user.phone);
        setShowUserModal(true);
    }

    return (
        <div className="SingleUser" onClick={clicked} >

            <h4> #{props.user && props.user.userId}</h4>
            <h4> <span> {props.user && props.user.name}</span> </h4>
            <p><span>Country: </span> {props.user && props.user.location.country} </p>
            <p><span>Joined On: </span>  {props.user && new Date(props.user.joinDate).toLocaleDateString()} </p>
            <a href={`tel:${props.user && props.user.phone}`}>Call</a>
        </div>
    )
}

export default SingleUser
