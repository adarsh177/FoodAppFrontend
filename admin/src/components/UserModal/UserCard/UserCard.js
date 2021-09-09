import React, { createContext, useContext, useEffect, useState } from "react";
import './UserCard.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UserProfile from "./UserProfile/UserProfile";
import OrderHistory from "./OrderHistory/OrderHistory";
import Inventory from "./Inventory/Inventory";
import Reviews from "./Reviews/Reviews";
import { UserCardContext } from "../../../pages/UserManagement";

import CircularProgress from '@material-ui/core/CircularProgress';
import { GetCustomerDetails, GetMerchantDetails } from "../../../APIs/AdminManager";


export const IsUserCardLoading = createContext();


function UserCard(props) {
    const [customerPhone, setCustomerPhone, merchantPhone, setMerchantPhone, userType, setUserType, userData, setUserData] = useContext(UserCardContext);


    const [isUserCardLoading, setIsUserCardLoading] = useState(false);
    const [tabValue, setTabValue] = React.useState(0);

    const handleChange = (event, nv) => {
        setTabValue(nv);
        console.log(nv);
    };

    useEffect(() => {
        if (merchantPhone) {
            setIsUserCardLoading(true);

            GetMerchantDetails(merchantPhone)
                .then((data) => {
                    setUserData(data);
                })
                .catch((err) => alert("Merchant not found" + err))
                .finally(() => setIsUserCardLoading(false));
        }

        else if (customerPhone) {
            setIsUserCardLoading(true);

            GetCustomerDetails(customerPhone)
                .then((data) => {
                    setUserData(data);
                })
                .catch(() => alert("Customer not found"))
                .finally(() => setIsUserCardLoading(false));
        };

        return () => {
            setCustomerPhone(null);
            setMerchantPhone(null);
            setUserData(null)
        }

    }, [customerPhone, merchantPhone])



    return (
        <div className="UserCard">
            <IsUserCardLoading.Provider value={[isUserCardLoading, setIsUserCardLoading]}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label="Profile" />
                        <Tab label="Order History" />
                        {userType === 'merchant' ? <Tab label="Inventory" /> : null}
                        {userType === 'merchant' ? <Tab label="Listed Items" /> : null}
                        {userType === 'merchant' ? <Tab label="Reviews" /> : null}
                    </Tabs>
                </AppBar>

                {isUserCardLoading ? <CircularProgress disableShrink /> : null}
                <div style={{ overflow: "auto", height: "100%", padding: "0 0.5rem" }}>

                    {tabValue === 0 ? <UserProfile /> : null}

                    {tabValue === 1 && userData ? <OrderHistory /> : null}
                    {tabValue === 2 && userData && userType === 'merchant' ? <Inventory type="inventory" /> : null}
                    {tabValue === 3 && userData && userType === 'merchant' ? <Inventory type="listing" /> : null}
                    {tabValue === 4 && userData && userType === 'merchant' ? <Reviews /> : null}
                </div>

            </IsUserCardLoading.Provider>
        </div >
    )
}

export default UserCard
