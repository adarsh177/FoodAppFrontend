import React, { useEffect, useState } from "react";
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


function UserProfile() {


    const [showNotificationDialog, setShowNotificationDialog] = useState(false);
    const [fcmToken, setFcmToken] = useState("");


    const [merchantData, setMerchantData] = useState(null);
    const [loading, setLoading] = useState(false);


    const UpdateMerchantComm = (ev) => {
        ev.preventDefault();
        setLoading(true);

        console.log("Commision", merchantData.commision);

        UpdateMerchantCommision(merchantData.userId, merchantData.commision)
            .catch((err) => alert("Error updating merchant commision : " + err))
            .finally(() => {
                setLoading(false);
                SearchMerchant();
            });
    };

    const SearchMerchant = () => {
        setLoading(true);
        setMerchantData(null);

        GetMerchantDetails("+912222222222")
            .then((data) => {
                setMerchantData(data);
            })
            .catch((err) => alert("Merchant not found" + err))
            .finally(() => setLoading(false));
    };

    const ToggleBlockMerchantClicked = () => {

        setLoading(true);
        ToggleBlockMerchant(merchantData.userId)
            .catch((err) => alert(err))
            .finally(() => {
                setLoading(false);
                SearchMerchant();
            });
    };


    const sendUserNotification = (e, token) => {
        e.preventDefault();
        setFcmToken(token);
        setShowNotificationDialog(true);
    };

    useEffect(() => {
        SearchMerchant();

    }, [])


    return (
        <div>
            {/* Merchant managenment Tab-------------------------------------------- */}

            <div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    merchantData !== null && (
                        <div className="userDetailContainer">
                            <div>
                                <div>
                                    <b>UserId : </b>
                                    <span>{merchantData.userId}</span>
                                </div>
                                <div>
                                    <b>Name : </b>
                                    <span>{merchantData.name}</span>
                                </div>
                                <div>
                                    <b>Phone number : </b>
                                    <span>{merchantData.phone}</span>
                                </div>
                                <div>
                                    <b>Total Earnings : </b>
                                    <span>
                                        {merchantData.totalEarnings
                                            ? `${merchantData.totalEarnings.currency} ${merchantData.totalEarnings.amount / 100
                                            }`
                                            : "0"}
                                    </span>
                                </div>
                                <div>
                                    <b>Location : </b>
                                    <span>{merchantData.location.label}</span>
                                </div>
                                <div>
                                    <b>Joined On : </b>
                                    <span>
                                        {new Date(merchantData.joinDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <div>
                                    <button className="notificationButton" onClick={ToggleBlockMerchantClicked}>
                                        {merchantData.blocked ? "Unblock" : "Block"}
                                    </button>

                                    <button
                                        onClick={(ev) =>
                                            sendUserNotification(ev, merchantData.fcmToken)
                                        }
                                        className="notificationButton"
                                    >
                                        Send Notification
                                    </button>
                                </div>
                                <br />
                                <div>
                                <span style={{marginRight:"1rem"}} >Commision</span>
                                    <input
                                        type="checkbox"
                                        checked={
                                            merchantData.commision !== null &&
                                            merchantData.commision !== undefined
                                        }
                                        onChange={(ev) => {
                                            setMerchantData((data) => ({
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
                                            merchantData.commision ? merchantData.commision : 0
                                        }
                                        style={{ width: "200px" }}
                                        onChange={(e) => {
                                            setMerchantData((data) => ({
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
                            </div>
                        </div>
                    )
                )}
            </div>


            <div className="footer">
                <MobileNavigationBottom />
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
