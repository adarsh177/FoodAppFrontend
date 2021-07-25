import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Stats from "./pages/Stats";
import TaxManagement from "./pages/TaxManagement";
import UserManagement from "./pages/UserManagement";
import Configuration from "./pages/Configuration";
import Feedback from "./pages/Feedback";

function App() {
   return (
      <Router>
         <Switch>
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
         </Switch>
      </Router>
   );
}

export default App;
