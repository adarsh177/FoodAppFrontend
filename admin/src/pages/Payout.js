import React from "react";
import {
    Navigation,
    MobileNavigationTop,
    MobileNavigationBottom,
} from "../components/navigation/navigation";
import "./css/Payout.css";

// external package  for tabs ---------------------------------

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function Payout() {
    let lastPayout = "2018/11/24";
    return (
        <div className="nav-container">
            <Navigation />
            <MobileNavigationTop />
            <div className="main">
                <Tabs>
                    <TabList>
                        <Tab>Canada</Tab>
                        <Tab>India</Tab>
                    </TabList>
                    <TabPanel>
                        <p>Canada payouts are made using Stripe</p>
                        <span>
                            Last payout date: <span>{lastPayout}</span>
                        </span>
                        <div>
                            <button className="payoutButton">Estimate</button>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <p>India payouts are made using RayzorPay</p>
                        <span>
                            Last payout date: <span>{lastPayout}</span>
                        </span>
                        <div>
                            <button className="payoutButton">Estimate</button>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
            <div className="footer">
                <MobileNavigationBottom />
            </div>
        </div>
    );
}

export default Payout;
