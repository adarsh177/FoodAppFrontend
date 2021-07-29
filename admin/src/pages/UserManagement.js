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
import { GetCustomerDetails, GetMerchantDetails, ToggleBlockCustomer, ToggleBlockMerchant } from "../APIs/AdminManager";

const UserManagement = () => {
   const [userSearchBox, setUserSearchBox] = useState();
   const [merchantSearchBox, setMerchantSearchBox] = useState();
   const [userData, setUserData] = useState(null)
   const [merchantData, setMerchantData] = useState(null)
   const [loading, setLoading] = useState(false)

   const SearchUser = () => {
      setLoading(true)
      setUserData(null)

      GetCustomerDetails(userSearchBox).then(data => {
         setUserData(data)
      }).catch(() => alert('Customer not found'))
      .finally(() => setLoading(false))
   }

   const SearchMerchant = () => {
      setLoading(true)
      setMerchantData(null)

      GetMerchantDetails(merchantSearchBox).then(data => {
         setMerchantData(data)
      }).catch((err) => alert('Merchant not found' + err))
      .finally(() => setLoading(false))
   }

   const ToggleBlockCustomerClicked = () => {
      setLoading(true)
      ToggleBlockCustomer(userData.userId)
      .catch(err => alert(err))
      .finally(() => {
         setLoading(false)
         SearchUser()
      })
   }

   const ToggleBlockMerchantClicked = () => {
      setLoading(true)
      ToggleBlockMerchant(merchantData.userId)
      .catch(err => alert(err))
      .finally(() => {
         setLoading(false)
         SearchMerchant()
      })
   }

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
                           value={userSearchBox}
                           onChange={(e) => {
                              setUserSearchBox(e.target.value);
                           }}
                        />
                        <button
                           className="searchButton"
                           type="submit"
                           onClick={SearchUser}
                        >
                           Search
                        </button>
                     </div>
                     <div className="userDetailContainer">
                        {loading ? <p>Loading...</p> : 
                           (
                              userData !== null &&
                                 <div>
                                    <div>
                                       <b>UserId : </b>
                                       <span>{userData.userId}</span>
                                    </div>
                                    <div>
                                       <b>Name : </b>
                                       <span>{userData.name}</span>
                                    </div>
                                    <div>
                                       <b>Phone number : </b>
                                       <span>{userData.phone}</span>
                                    </div>
                                    <div>
                                       <b>Wallet Balance : </b>
                                       <span>{userData.walletBalance}</span>
                                    </div>
                                    <div>
                                       <b>Location : </b>
                                       <span>{userData.location.label}</span>
                                    </div>
                                    <div>
                                       <b>Joined On : </b>
                                       <span>{new Date(userData.joinDate).toISOString()}</span>
                                    </div>
                                    <div>
                                       <button onClick={ToggleBlockCustomerClicked}>{userData.blocked ? "Unblock" : "Block"}</button>
                                    </div>
                                 </div>
                           )
                        }
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
                           value={merchantSearchBox}
                           onChange={(e) => {
                              setMerchantSearchBox(e.target.value);
                           }}
                        />
                        <button
                           className="searchButton"
                           type="submit"
                           onClick={SearchMerchant}
                        >
                           Search
                        </button>
                     </div>
                     {loading ? <p>Loading...</p> : 
                     (merchantData !== null && 
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
                                 <span>{merchantData.totalEarnings}</span>
                              </div>
                              <div>
                                 <b>Location : </b>
                                 <span>{merchantData.location.label}</span>
                              </div>
                              <div>
                                 <b>Joined On : </b>
                                 <span>{new Date(merchantData.joinDate).toISOString()}</span>
                              </div>
                              <div>
                                 <button onClick={ToggleBlockMerchantClicked}>
                                    {merchantData.blocked ? "Unblock": "Block"}
                                 </button>
                              </div>
                           </div>
                        </div>)}
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
