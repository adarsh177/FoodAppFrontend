import React, { useEffect, useState } from "react";
import {
  Navigation,
  MobileNavigationTop,
  MobileNavigationBottom,
} from "../components/navigation/navigation";
import "./css/Payout.css";

// external package  for tabs ---------------------------------

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  GetPayoutEstimateRazorpay,
  GetPayoutEstimateStripe,
} from "../APIs/AdminManager";
import Dinero from "dinero.js";

function Payout() {
  const [payoutMoneyIN, setPayoutMoneyIN] = useState("Loading..."); // FOR CANADA
  const [payoutMoneyCN, setPayoutMoneyCN] = useState("Loading..."); // FOR CANADA

  const estimatePayoutCN = () => {
    setPayoutMoneyCN("Loading...");
    GetPayoutEstimateStripe()
      .then((val) => {
        if (val) {
          const din = Dinero(val);
          setPayoutMoneyCN(`${din.getCurrency()} ${din.toUnit()}`);
        } else setPayoutMoneyCN("0");
      })
      .catch((err) => {
        setPayoutMoneyCN("Error: " + err);
      });
  };

  const estimatePayoutIN = () => {
    setPayoutMoneyIN("Loading...");
    GetPayoutEstimateRazorpay()
      .then((val) => {
        if (val) {
          const din = Dinero(val);
          setPayoutMoneyIN(`${din.getCurrency()} ${din.toUnit()}`);
        } else setPayoutMoneyIN("0");
      })
      .catch((err) => {
        setPayoutMoneyIN("Error: " + err);
      });
  };

  useEffect(() => {
    estimatePayoutCN();
    estimatePayoutIN();
  }, []);

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
            <h1>{payoutMoneyCN}</h1>
            <div>
              <button className="payoutButton" onClick={estimatePayoutCN}>
                Estimate
              </button>
              <button className="payoutButton" onClick={() => {}}>
                Initiate Payout
              </button>
            </div>
          </TabPanel>
          <TabPanel>
            <p>India payouts are made using RayzorPay</p>
            <h1>{payoutMoneyIN}</h1>
            <div>
              <button className="payoutButton" onClick={estimatePayoutIN}>
                Estimate
              </button>
              <button className="payoutButton" onClick={() => {}}>
                Initiate Payout
              </button>
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
