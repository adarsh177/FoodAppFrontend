import React, { useEffect, useState } from "react";
import {
  Navigation,
  MobileNavigationTop,
  MobileNavigationBottom,
} from "../components/navigation/navigation";
import "./css/UserManagement.css";
import NotificationDialogue from "../components/dialogue/NotificationDialogue";

// external package ---------------------------------------------
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  GetCustomerDetails,
  GetMerchantDetails,
  ToggleBlockCustomer,
  ToggleBlockMerchant,
  UpdateMerchantCommision,
  CheckAdmin
} from "../APIs/AdminManager";
import { useHistory } from "react-router";

const UserManagement = () => {
  const [userSearchBox, setUserSearchBox] = useState();
  const [merchantSearchBox, setMerchantSearchBox] = useState();
  const [userData, setUserData] = useState(null);
  const [merchantData, setMerchantData] = useState(null);
  const [loading, setLoading] = useState(false);

  const linkStack = useHistory()

  useEffect(() => {
    CheckAdmin().then((data) => {
        if(!data.superAdmin) linkStack.replace('/stats')
    });
}, []);


  const SearchUser = () => {
    setLoading(true);
    setUserData(null);

    GetCustomerDetails(userSearchBox)
      .then((data) => {
        setUserData(data);
      })
      .catch(() => alert("Customer not found"))
      .finally(() => setLoading(false));
  };

  const SearchMerchant = () => {
    setLoading(true);
    setMerchantData(null);

    GetMerchantDetails(merchantSearchBox)
      .then((data) => {
        setMerchantData(data);
      })
      .catch((err) => alert("Merchant not found" + err))
      .finally(() => setLoading(false));
  };

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

  const ToggleBlockCustomerClicked = () => {
    setLoading(true);
    ToggleBlockCustomer(userData.userId)
      .catch((err) => alert(err))
      .finally(() => {
        setLoading(false);
        SearchUser();
      });
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

  // send notification to user ------------------------------

  // dialogue -----------------------------

  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [fcmToken, setFcmToken] = useState("");

  // userNotification trigger ----------------------------------

  const sendUserNotification = (e, token) => {
    e.preventDefault();
    setFcmToken(token);
    setShowNotificationDialog(true);
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
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  userData !== null && (
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
                        {userData.walletBalance !== null &&
                        userData.walletBalance !== undefined ? (
                          <span>
                            {userData.walletBalance.currency}{" "}
                            {userData.walletBalance.amount / 100}
                          </span>
                        ) : (
                          <span>0</span>
                        )}
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
                        <button onClick={ToggleBlockCustomerClicked}>
                          {userData.blocked ? "Unblock" : "Block"}
                        </button>
                        <button
                          onClick={(ev) =>
                            sendUserNotification(ev, userData.fcmToken)
                          }
                          className="notificationButton"
                        >
                          Send Notification
                        </button>
                      </div>
                    </div>
                  )
                )}
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
                            ? `${merchantData.totalEarnings.currency} ${
                                merchantData.totalEarnings.amount / 100
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
                          {new Date(merchantData.joinDate).toISOString()}
                        </span>
                      </div>
                      <div>
                        <button onClick={ToggleBlockMerchantClicked}>
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
                      <p>Commision</p>
                      <div>
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
          </TabPanel>
        </Tabs>
      </div>
      <div className="footer">
        <MobileNavigationBottom />
      </div>
      {showNotificationDialog && (
        <NotificationDialogue
          fcmToken={fcmToken}
          onClose={() => {
            setShowNotificationDialog(false);
          }}
          onSend={() => {
            window.alert("send notification");
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;
