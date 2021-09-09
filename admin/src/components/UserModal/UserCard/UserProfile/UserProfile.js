import React, { useContext, useEffect, useState } from "react";
import './UserProfile.css'


import NotificationDialogue from "../../../dialogue/NotificationDialogue";

import {
    Navigation,
    MobileNavigationTop,
    MobileNavigationBottom,
} from "../../../navigation/navigation";

import {
    GetCustomerDetails,
    GetMerchantDetails,
    ToggleBlockCustomer,
    ToggleBlockMerchant,
    UpdateMerchantCommision,
} from "../../../../APIs/AdminManager";
import { UserCardContext } from "../../../../pages/UserManagement";
import { UserModalContext } from "../../../../App";
import { IsUserCardLoading } from "../UserCard";


function UserProfile() {

    const [customerPhone, setCustomerPhone, merchantPhone, setMerchantPhone, userType, setUserType, userData, setUserData] = useContext(UserCardContext);
    const [showUserModal, setShowUserModal] = useContext(UserModalContext);
    const  [isUserCardLoading, setIsUserCardLoading] = useContext(IsUserCardLoading);


    const [showNotificationDialog, setShowNotificationDialog] = useState(false);
    const [fcmToken, setFcmToken] = useState("");


  

    useEffect(() => {
        if(userType === 'merchant' && merchantPhone && !userData) SearchMerchant(merchantPhone);
        else if(userType === 'customer' && customerPhone && !userData)  SearchCustomer(customerPhone)
        
    }, [customerPhone, merchantPhone])

    
  const SearchCustomer = (customerPhone) => {
    setIsUserCardLoading(true);

    GetCustomerDetails(customerPhone)
      .then((data) => {
        setUserData(data);
      })
      .catch(() => alert("Customer not found"))
      .finally(() => setIsUserCardLoading(false));
  };

  const SearchMerchant = (merchantPhone) => {
    setIsUserCardLoading(true);

    GetMerchantDetails(merchantPhone)
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => alert("Merchant not found" + err))
      .finally(() => setIsUserCardLoading(false));
  };




    const sendUserNotification = (e, token) => {
        e.preventDefault();
        setFcmToken(token);
        setShowNotificationDialog(true);
    };

    const UpdateMerchantComm = (ev) => {
        ev.preventDefault();
        setIsUserCardLoading(true);


        UpdateMerchantCommision(userData.userId, userData.commision)
            .catch((err) => alert("Error updating merchant commision : " + err))
            .finally(() => {
                setIsUserCardLoading(false);
                SearchMerchant(userData.userId);
            });
    };

    const ToggleBlockCustomerClicked = () => {
        setIsUserCardLoading(true);
        ToggleBlockCustomer(userData.userId)
            .catch((err) => alert(err))
            .finally(() => {
                setIsUserCardLoading(false);
                SearchCustomer(userData.userId);
            });
    };

    const ToggleBlockMerchantClicked = () => {

        setIsUserCardLoading(true);
        ToggleBlockMerchant(userData.userId)
            .catch((err) => alert(err))
            .finally(() => {
                setIsUserCardLoading(false);
                SearchMerchant(userData.userId);
            });
    };



    return (
        <div>
            {/* Merchant managenment Tab-------------------------------------------- */}

            <div >

                {
                    userData  && (
                        <div className="userDetailContainer">
                            <div>
                                <div>
                                    <b>UserId : </b>
                                    <span>{userData && userData.userId}</span>
                                </div>
                                <div>
                                    <b>Name : </b>
                                    <span>{userData && userData.name}</span>
                                </div>
                                <div>
                                    <b>Phone number : </b>
                                    <span>{userData && userData.phone}</span>
                                </div>
                                {userType === "merchant" ?
                                    <div>
                                        <b>Total Earnings : </b>
                                        <span>
                                            {userData && userData.totalEarnings
                                                ? `${userData && userData.totalEarnings.currency} ${userData && userData.totalEarnings.amount / 100
                                                }`
                                                : "0"}
                                        </span>
                                    </div>
                                    :
                                    <div>
                                        <b>Wallet Balance : </b>
                                        {userData && userData.walletBalance !== null &&
                                            userData && userData.walletBalance !== undefined ? (
                                            <span>
                                                {userData && userData.walletBalance.currency}{" "}
                                                {userData && userData.walletBalance.amount / 100}
                                            </span>
                                        ) : (
                                            <span>0</span>
                                        )}
                                    </div>
                                }
                                <div>
                                    <b>Location : </b>
                                    <span>{userData && userData.location.label}</span>
                                </div>
                                <div>
                                    <b>Joined On : </b>
                                    <span>
                                        {new Date(userData && userData.joinDate).toLocaleDateString()}
                                    </span>
                                </div >
                                <div style={{display:"flex", justifyContent: "center"}}>
                                    <button className="notificationButton" onClick={userType === "merchant" ? ToggleBlockMerchantClicked : ToggleBlockCustomerClicked}>
                                        {userData && userData.blocked ? "Unblock" : "Block"}
                                    </button>

                                    <button
                                        onClick={(ev) =>
                                            sendUserNotification(ev, userData && userData.fcmToken)
                                        }
                                        className="notificationButton"
                                    >
                                        Send Notification
                                    </button>
                                </div>
                                <br />

                                {userType === 'merchant' ?
                                    <div>
                                        <span style={{ marginRight: "1rem" }} >Commision</span>
                                        <input
                                            type="checkbox"
                                            checked={
                                                userData && userData.commision !== null &&
                                                userData && userData.commision !== undefined
                                            }
                                            onChange={(ev) => {
                                                setUserData((data) => ({
                                                    ...data,
                                                    commision: ev.target.checked ? 0 : null,
                                                }));
                                            }}
                                        />
                                        <input
                                            className="searchBar"
                                            type="number"
                                            placeholder="Commision Percent"
                                            name="serach merchant"
                                            value={
                                                userData && userData.commision ? userData && userData.commision : 0
                                            }
                                            style={{ width: "200px" }}
                                            onChange={(e) => {
                                                setUserData((data) => ({
                                                    ...data,
                                                    commision: parseFloat(e.target.value),
                                                }));
                                            }}
                                        />

                                        <button
                                            onClick={(ev) => UpdateMerchantComm(ev)}
                                            className="notificationButton"
                                        >
                                            Set Commision
                                        </button>
                                    </div>
                                    : null}

                            </div>
                        </div>
                    )
                }
            </div>

          
            {
                showNotificationDialog && (
                    <NotificationDialogue
                        fcmToken={fcmToken}
                        onClose={() => {
                            setShowNotificationDialog(false);
                        }}
                        onSend={() => {
                            window.alert("send notification");
                        }}
                    />
                )
            }
        </div>
    )
}

export default UserProfile
