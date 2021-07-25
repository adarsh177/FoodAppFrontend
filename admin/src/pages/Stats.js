import React from "react";
import {
   Navigation,
   MobileNavigationTop,
   MobileNavigationBottom,
} from "../components/navigation/navigation";
import "./css/Stats.css";

//external package for drop down

import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem, Divider } from "rc-menu";
import "rc-dropdown/assets/index.css";

const Stats = () => {
   // functions for drop down --------------------------------------------
   function onSelect({ key }) {
      console.log(`${key} selected`);
   }

   function onVisibleChange(visible) {
      console.log(visible);
   }
   // menu from rc-menu ---------------------------------------------------
   const menu = (
      <Menu onSelect={onSelect}>
         <MenuItem key="1" defaultVisible="true">
            Today
         </MenuItem>
         <Divider />
         <MenuItem key="2">This week</MenuItem>
         <Divider />
         <MenuItem key="3">This Monthk</MenuItem>
         <Divider />
         <MenuItem key="4">This year</MenuItem>
         <Divider />
         <MenuItem key="5">Lifetime</MenuItem>
      </Menu>
   );

   //  values of details -------------------------------------

   const totalOrder = 45441;
   const totalCustomer = 5525;
   const totalMerchant = 4242;
   const totalRevenue = 2544655;

   return (
      <div className="nav-container">
         <Navigation />
         <MobileNavigationTop />
         <div className="main">
            <div className="header">
               <h1>Stats</h1>

               <Dropdown
                  trigger={["click"]}
                  overlay={menu}
                  animation="slide-up"
                  onVisibleChange={onVisibleChange}
               >
                  <button style={{ width: 120, height: "2.5rem" }}>
                     Select duration
                  </button>
               </Dropdown>
            </div>
            <div>
               <div className="detailOuterContainer">
                  <div className="detailsContainer">
                     <h3 className="detailTitle">Total Orders : </h3>
                     <p className="details">{totalOrder}</p>
                  </div>
                  <div className="detailsContainer">
                     <h3 className="detailTitle">Total customer : </h3>
                     <p className="details">{totalCustomer}</p>
                  </div>
                  <div className="detailsContainer">
                     <h3 className="detailTitle">Total Merchant : </h3>
                     <p className="details">{totalMerchant}</p>
                  </div>
                  <div className="detailsContainer">
                     <h3 className="detailTitle">Total Revenue : </h3>
                     <p className="details">$ {totalRevenue}</p>
                  </div>
               </div>
            </div>
         </div>
         <div className="footer">
            <MobileNavigationBottom />
         </div>
      </div>
   );
};

export default Stats;
