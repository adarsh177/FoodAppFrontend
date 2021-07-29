import React, { useState, useMemo } from "react";
import {
   Navigation,
   MobileNavigationTop,
   MobileNavigationBottom,
} from "../components/navigation/navigation";
import "./css/TaxManagement.css";

// external package -----------------------------------------------

import Select from "react-select";

const TaxManagement = () => {
   const [value, setValue] = useState("");

   const changeHandler = (value) => {
      setValue(value);
   };

   // delete tax ------------------------------------------------
   const deleteTax = () => {
      return null;
   };
   // add tax -------------------------------------------------

   const addTax = () => {
      return null;
   };

   // Tax input percentage ----------------------------------------

   const [taxPercent, settaxPercent] = useState();

   // Tax Name Input ----------------------------------------------

   const [taxName, settaxName] = useState();

   return (
      <div className="nav-container">
         <Navigation />
         <MobileNavigationTop />
         <div className="main">
            <h1>Tax Management</h1>
            <div>
               
            </div>
            <div>
               <h3>Current Tax</h3>
               <div className="flex-space-bw">
                  <div className="flex-row">
                     <b>CGST: </b>
                     <p> 9%</p>
                  </div>
                  <button onClick={deleteTax} className="deleteButton">
                     &#128465;
                  </button>
               </div>
               <div className="flex-space-bw">
                  <div className="flex-row">
                     <b>SGST: </b>
                     <p> 9%</p>
                  </div>
                  <button onClick={deleteTax} className="deleteButton">
                     &#128465;
                  </button>
               </div>

               <div className="addTaxContainer">
                  <div className="inputContainer">
                     <lable>Tax Name</lable>
                     <input
                        className="addTaxInput"
                        type="text"
                        value={taxName}
                        onChange={(e) => {
                           settaxName(e.target.value);
                        }}
                     />
                  </div>
                  <div className="inputContainer">
                     <lable>Tax Percentage</lable>
                     <input
                        className="addTaxInput"
                        type="text"
                        value={taxPercent}
                        onChange={(e) => {
                           settaxPercent(e.target.value);
                        }}
                     />
                  </div>
                  <button onClick={addTax}>Add Tax</button>
               </div>
            </div>
         </div>
         <div className="footer">
            <MobileNavigationBottom />
         </div>
      </div>
   );
};

export default TaxManagement;
