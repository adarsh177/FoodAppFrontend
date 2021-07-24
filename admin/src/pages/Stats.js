import React from "react";
import {
   Navigation,
   MobileNavigationTop,
   MobileNavigationBottom,
} from "../components/navigation/navigation";
import "./Stats.css";

const Stats = () => {
   return (
      <div className="stats">
         <Navigation />
         <MobileNavigationTop />
         <div className="main">
            <h1>Stats</h1>
         </div>
         <div className="footer">
            <MobileNavigationBottom />
         </div>
      </div>
   );
};

export default Stats;
