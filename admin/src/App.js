import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';

import Stats from "./pages/Stats";
import TaxManagement from "./pages/TaxManagement";
import UserManagement from "./pages/UserManagement";
import Configuration from "./pages/Configuration";
import Feedback from "./pages/Feedback";
import Splash from "./pages/Splash";
import LoginScreen from "./pages/LoginScreen";
import FirebaseUtil from "./Utils/FirebaseUtil";
import { CheckAdmin } from "./APIs/AdminManager";
import Payout from "./pages/Payout";

import UserModal from "./components/UserModal/UserModal";
import OrderModal from "./components/OrderModal/OrderModal";

export const UserModalContext = createContext();
export const OrderModalContext = createContext();

function App() {
  const FirebaseApp = new FirebaseUtil().app();
  const [loading, setLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(true);
  const [showOrderModal, setShowOrderModal] = useState(false);

const [singleOrderId, setSingleOrderId] = useState();

  useEffect(() => {
    const subscription = FirebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        CheckAdmin()
          .then(async (data) => { })
          .catch(async (err) => {
            alert("User not allowed, logging out: " + err);
            await FirebaseApp.auth().signOut();
            window.location = "./";
          })
          .finally(() => {
            setLoading(false);
            subscription();
          });
      } else {
        setLoading(false);
        subscription();
      }
    });
  }, []);

  if (loading) return <p>Please wait</p>;

  return (
    <div className="App">


      <OrderModalContext.Provider value={[showOrderModal, setShowOrderModal, singleOrderId, setSingleOrderId]}>
        <UserModalContext.Provider value={[showUserModal, setShowUserModal]}>

          <Router>
            <Switch>
              <Route path="/login" exact>
                <LoginScreen />
              </Route>
              <Route path="/tax" exact>
                <TaxManagement />
              </Route>
              <Route path="/users" exact>
                <UserManagement />
              </Route>
              <Route path="/config" exact>
                <Configuration />
              </Route>
              <Route path="/feedback" exact>
                <Feedback />
              </Route>
              <Route path="/stats" exact>
                <Stats />
              </Route>
              <Route path="/payout" exact>
                <Payout />
              </Route>
              <Route>
                <Splash />
              </Route>
            </Switch>
          </Router>

        </UserModalContext.Provider>
      </OrderModalContext.Provider>
    </div>

  );
}

export default App;
