import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Navigation,
  MobileNavigationTop,
  MobileNavigationBottom,
} from "../components/navigation/navigation";
import "./css/UserManagement.css";
import NotificationDialogue from "../components/dialogue/NotificationDialogue";

// external package ---------------------------------------------
import "react-tabs/style/react-tabs.css";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  GetCustomerDetails,
  GetMerchantDetails,
  ToggleBlockCustomer,
  ToggleBlockMerchant,
  UpdateMerchantCommision,
  CheckAdmin
} from "../APIs/AdminManager";
import { useHistory } from "react-router";
import { OrderModalContext, UserModalContext } from "../App";
import UserModal from "../components/UserModal/UserModal";
import PaginateUserList from "../components/PaginateUserList/PaginateUserList";
import OrderModal from "../components/OrderModal/OrderModal";


export const UserCardContext = createContext();
export const IsMainLoading = createContext();


const UserManagement = () => {

  const [userSearchBox, setUserSearchBox] = useState();
  const [merchantSearchBox, setMerchantSearchBox] = useState();
  const [customerPhone, setCustomerPhone] = useState(null);
  const [merchantPhone, setMerchantPhone] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState();

  const [userData, setUserData] = useState()


  const [showUserModal, setShowUserModal] = useContext(UserModalContext);

  const linkStack = useHistory()

  useEffect(() => {
    setIsLoading(true);
    CheckAdmin().then((data) => {
      if (!data.superAdmin) linkStack.replace('/stats')
    }).catch(() => alert("Customer not found"))
    .finally(() => setIsLoading(false));;
  }, []);


  const SearchCustomer = () => {
    setUserType("customer")
    setCustomerPhone(userSearchBox);
    setIsLoading(true);
    GetCustomerDetails(userSearchBox)
      .then((data) => {
        setUserData(data);
        setShowUserModal(true);
      })
      .catch(() => alert("Customer not found"))
      .finally(() => setIsLoading(false));
  };

  const SearchMerchant = () => {
    setUserType("merchant")
    setIsLoading(true);
    setMerchantPhone(merchantSearchBox);
    GetMerchantDetails(merchantSearchBox)
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => alert("Merchant not found" + err))
      .finally(() => setIsLoading(false));
    setShowUserModal(true);
  };

  // send notification to user ------------------------------

  // dialogue -----------------------------

  const [showOrderModal, setShowOrderModal, singleOrderId, setSingleOrderId] = useContext(OrderModalContext)

  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [fcmToken, setFcmToken] = useState("");

  // userNotification trigger ----------------------------------
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (value === 0) setUserType('customer');
    else setUserType('merchant');
  }, [value])


  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setUserType("customer")
    }
    else if (newValue === 1) {
      setUserType("merchant")
    }
  };



  return (
    <div className="nav-container">
      <UserCardContext.Provider value={[customerPhone, setCustomerPhone, merchantPhone, setMerchantPhone, userType, setUserType, userData, setUserData]}>
        <IsMainLoading.Provider value={[isLoading, setIsLoading]}>
          {
            (merchantPhone && userType === "merchant") || (customerPhone && userType === "customer") ? <UserModal /> : null
          }
          {singleOrderId? <OrderModal/>: null}
          <Navigation />
          <MobileNavigationTop />
          <div className="main">
            <AppBar position="static" >
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Customers" />
                <Tab label="Merchants" />
              </Tabs>
            </AppBar>

            {value === 0 ? <div className="userSearchScreen">


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
                  onClick={SearchCustomer}
                >
                  Search
                </button>
              </div>


              <PaginateUserList />
            </div> : null
            }
            {
              value === 1 ?

                <div className="userSearchScreen">

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

                  <PaginateUserList />
                </div>
                : null
            }

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
        </IsMainLoading.Provider>
      </UserCardContext.Provider>
    </div>
  );
};

export default UserManagement;
