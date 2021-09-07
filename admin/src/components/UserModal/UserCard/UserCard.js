import React, { useEffect, useState } from "react";
import './UserCard.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UserProfile from "./UserProfile/UserProfile";
import OrderHistory from "./OrderHistory/OrderHistory";
import Inventory from "./Inventory/Inventory";
import Reviews from "./Reviews/Reviews";



function UserCard() {


    const [value, setValue] = React.useState(4);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue);
    };

    return (
        <div className="UserCard">
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Profile" />
                    <Tab label="Order History" />
                    <Tab label="Inventory" />
                    <Tab label="Listed Items" />
                    <Tab label="Reviews" />
                </Tabs>
            </AppBar>

            <div style={{overflow:"auto", height:"100%", padding:"0 0.5rem"}}>

                {value === 0 ? <UserProfile /> : null}
                {value === 1 ? <OrderHistory /> : null}
                {value === 2 ? <Inventory type="inventory" /> : null}
                {value === 3 ? <Inventory type="listing" /> : null}
                {value === 4 ? <Reviews /> : null}
            </div>

        </div >
    )
}

export default UserCard
