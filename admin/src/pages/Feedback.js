import React from "react";
import {
   Navigation,
   MobileNavigationTop,
   MobileNavigationBottom,
} from "../components/navigation/navigation";
import "./css/Feedback.css";

const Feedback = () => {
   const name = "karan";
   const phone = "+919455656532";
   const date = "date";
   const feedback =
      "dkf hk s dfgjd fjg jk hsj dgf b df s huudhf d f dfg tdfg dsb fjsd hfsdf huh df";

   return (
      <div className="nav-container">
         <Navigation />
         <MobileNavigationTop />
         <div className="main">
            <h1>Feedbacks</h1>
            <div class="feedbackContainer">
               <div className="flex-row">
                  <b>Name:</b>
                  <p className="lessHight">{name}</p>
               </div>
               <div className="flex-row">
                  <b>Phone:</b>
                  <p className="lessHight">{phone}</p>
               </div>
               <div className="flex-row">
                  <b>Date:</b>
                  <p className="lessHight">{date}</p>
               </div>
               <div className="flex-row">
                  <b>Feedback:</b>
                  <p className="lessHight">{feedback}</p>
               </div>
            </div>
         </div>
         <div className="footer">
            <MobileNavigationBottom />
         </div>
      </div>
   );
};

export default Feedback;
