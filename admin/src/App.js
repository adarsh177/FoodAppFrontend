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

import Modal from "./components/OrderModal/OrderModal";
import OrderCard from "./components/OrderModal/OrderCard/OrderCard";
import UserCard from "./components/UserModal/UserCard/UserCard";
import UserModal from "./components/UserModal/UserModal";
import OrderModal from "./components/OrderModal/OrderModal";

export const ModalContext = createContext();

function App() {
  const FirebaseApp = new FirebaseUtil().app();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(true);


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

      <ModalContext.Provider value={[showModal, setShowModal]}>

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
          {/* <UserModal/> */}
          <OrderModal/>
        </Router>

      </ModalContext.Provider>
    </div>

  );
}

export default App;
