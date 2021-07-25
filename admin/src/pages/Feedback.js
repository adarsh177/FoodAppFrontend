import React from "react";
import {
   Navigation,
   MobileNavigationTop,
   MobileNavigationBottom,
} from "../components/navigation/navigation";
import "./css/Feedback.css";

const Feedback = () => {
   return (
      <div className="nav-container">
         <Navigation />
         <MobileNavigationTop />
         <div className="main">
            <h1>Feedback</h1>
         </div>
         <div className="footer">
            <MobileNavigationBottom />
         </div>
      </div>
   );
};

export default Feedback;
