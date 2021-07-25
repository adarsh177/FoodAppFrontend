import React, { useState } from "react";
import {
   Navigation,
   MobileNavigationTop,
   MobileNavigationBottom,
} from "../components/navigation/navigation";
import "./css/UserManagement.css";

// external package ---------------------------------------------
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const UserManagement = () => {
   // user details  (users) ------------------------------------------------

   //user serach input ----------------------------

   const [userSearch, setUserSearch] = useState();

   // submit user search ---------------------------

   const submitUserSearch = () => {
      alert("search value " + userSearch);
   };

   const user = {
      key: 1,
      name: "username",
      email: "useremail@gmail.com",
      phone: "+9198454554514",
      location: "user location",
      block: false,
   };

   const orders = [
      {
         id: 1,
         restaurant: "amarpali",
         price: 500,
         time: "date here",
      },
      {
         id: 2,
         restaurant: "amarpali",
         price: 500,
         time: "date here",
      },
      {
         id: 3,
         restaurant: "amarpali",
         price: 500,
         time: "date here",
      },
      {
         id: 4,
         restaurant: "amarpali",
         price: 500,
         time: "date here",
      },
   ];

   // block button logic --------------------------------------------
   let blockText;
   if (user.block === false) {
      blockText = "block";
   } else {
      blockText = "unblock";
   }

   const [blockUser, setblockUser] = useState(blockText);

   const userblock = function () {
      if (user.block === false) {
         user.block = true;
         setblockUser("unblock");
      } else {
         user.block = false;
         setblockUser("block");
      }
      return blockUser;
   };

   const oderComponent = (orderDetails) => {
      return (
         <div key={orderDetails.id} className="userDetailContainer">
            <div className="userOrderDetails">
               <b>Restaurant : </b>
               <p>{orderDetails.restaurant}</p>
            </div>

            <div className="userOrderDetails">
               <b>Price : </b>
               <p>{orderDetails.price}</p>
            </div>
            <div className="userOrderDetails">
               <b>Time : </b>
               <p>{orderDetails.time}</p>
            </div>
         </div>
      );
   };

   // merchant details -------------------------------------------------------------

   //user serach input ----------------------------

   const [merchantSearch, setMerchantSearch] = useState();

   // submit user search ---------------------------

   const submitMerchantSearch = () => {
      alert("search value " + merchantSearch);
   };

   const merchant = {
      key: 1,
      name: "username",
      email: "useremail@gmail.com",
      phone: "+9198454554514",
      location: "user location",
      block: false,
   };

   const merchantOrders = [
      {
         id: 1,
         restaurant: "amarpddfali",
         price: 504650,
         time: "date here",
      },
      {
         id: 2,
         restaurant: "amarpali",
         price: 543500,
         time: "date here",
      },
      {
         id: 3,
         restaurant: "amarpgyhfali",
         price: 50450,
         time: "date here",
      },
      {
         id: 4,
         restaurant: "amasdsdrpali",
         price: 504550,
         time: "date here",
      },
   ];

   // block button logic (merchant) --------------------------------------------
   let blockMerchantText;
   if (merchant.block === false) {
      blockMerchantText = "block";
   } else {
      blockMerchantText = "unblock";
   }

   const [blockMerchant, setblockMerchant] = useState(blockMerchantText);

   const Merchantblock = function () {
      if (merchant.block === false) {
         merchant.block = true;
         setblockMerchant("unblock");
      } else {
         merchant.block = false;
         setblockMerchant("block");
      }
      return blockMerchant;
   };

   const MerchantoderComponetn = (merchantorderDetails) => {
      return (
         <div key={merchantorderDetails.id} className="userDetailContainer">
            <div className="userOrderDetails">
               <b>Restaurant : </b>
               <p>{merchantorderDetails.restaurant}</p>
            </div>

            <div className="userOrderDetails">
               <b>Price : </b>
               <p>{merchantorderDetails.price}</p>
            </div>
            <div className="userOrderDetails">
               <b>Time : </b>
               <p>{merchantorderDetails.time}</p>
            </div>
         </div>
      );
   };

   return (
      <div className="nav-container">
         <Navigation />
         <MobileNavigationTop />
         <div className="main">
            <Tabs>
               <TabList>
                  <Tab>Users</Tab>
                  <Tab>Merchants</Tab>
               </TabList>
               {/* User managenment Tab-------------------------------------------- */}
               <TabPanel>
                  <div>
                     <div className="serachContainer">
                        <input
                           className="searchBar"
                           type="text"
                           placeholder="Search user by phone number"
                           name="serach user"
                           value={userSearch}
                           onChange={(e) => {
                              setUserSearch(e.target.value);
                              console.log(userSearch);
                           }}
                        />
                        <button
                           className="searchButton"
                           type="submit"
                           onClick={submitUserSearch}
                        >
                           Search
                        </button>
                     </div>
                     <div className="userDetailContainer">
                        <div>
                           <div>
                              <b>Name : </b>
                              <span>{user.name}</span>
                           </div>
                           <div>
                              <b>Email : </b>
                              <span>{user.email}</span>
                           </div>
                           <div>
                              <b>Phone number : </b>
                              <span>{user.phone}</span>
                           </div>
                           <div>
                              <b>Location : </b>
                              <span>{user.location}</span>
                           </div>
                           <div>
                              <button onClick={userblock}>{blockUser}</button>
                           </div>
                        </div>
                        <div>
                           <div>{orders.map(oderComponent)}</div>
                        </div>
                     </div>
                  </div>
               </TabPanel>

               {/* Merchant managenment Tab-------------------------------------------- */}

               <TabPanel>
                  <div>
                     <div className="serachContainer">
                        <input
                           className="searchBar"
                           type="text"
                           placeholder="Search merchant by phone number"
                           name="serach merchant"
                           value={merchantSearch}
                           onChange={(e) => {
                              setMerchantSearch(e.target.value);
                           }}
                        />
                        <button
                           className="searchButton"
                           type="submit"
                           onClick={submitMerchantSearch}
                        >
                           Search
                        </button>
                     </div>
                     <div className="userDetailContainer">
                        <div>
                           <div>
                              <b>Name : </b>
                              <span>{merchant.name}</span>
                           </div>
                           <div>
                              <b>Email : </b>
                              <span>{merchant.email}</span>
                           </div>
                           <div>
                              <b>Phone number : </b>
                              <span>{merchant.phone}</span>
                           </div>
                           <div>
                              <b>Location : </b>
                              <span>{merchant.location}</span>
                           </div>
                           <div>
                              <button onClick={Merchantblock}>
                                 {blockMerchant}
                              </button>
                           </div>
                        </div>
                        <div>
                           <div>
                              {merchantOrders.map(MerchantoderComponetn)}
                           </div>
                        </div>
                     </div>
                  </div>
               </TabPanel>
            </Tabs>
         </div>
         <div className="footer">
            <MobileNavigationBottom />
         </div>
      </div>
   );
};

export default UserManagement;
