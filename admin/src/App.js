import React from "react";
import Stats from "./pages/Stats";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
   return (
      <main>
         <Router>
            <Switch>
               <Route path="/" exact>
                  <Stats />
               </Route>
               <Route path="/tax" exact>
                  <div>
                     <h1>Tax</h1>
                  </div>
               </Route>
               <Route path="/users" exact>
                  <div>
                     <h1>users</h1>
                  </div>
               </Route>
               <Route path="/config" exact>
                  <div>
                     <h1>config</h1>
                  </div>
               </Route>
               <Route path="/feedback" exact>
                  <div>
                     <h1>feedback</h1>
                  </div>
               </Route>
            </Switch>
         </Router>
      </main>
   );
}

export default App;
