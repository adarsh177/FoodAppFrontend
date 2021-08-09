import React, { useState, useMemo } from "react";
import {
    Navigation,
    MobileNavigationTop,
    MobileNavigationBottom,
} from "../components/navigation/navigation";
import "./css/TaxManagement.css";

// external package -----------------------------------------------

import Select from "react-select";
import { Item } from "rc-menu";

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

    // search tax ------------------------------------------------

    const searchTax = () => {
        return null;
    };

    // Tax input percentage ----------------------------------------

    const [taxPercent, settaxPercent] = useState();

    // Tax Name Input ----------------------------------------------

    const [taxName, settaxName] = useState();

    // storing the value of county for dependent dropdown --------------

    const [country, setCountry] = useState();

    // maping the list of states of country -------------------------

    const states = require("../assets/states.json");

    return (
        <div className="nav-container">
            <Navigation />
            <MobileNavigationTop />
            <div className="main">
                <h1>Tax Management</h1>
                <div>
                    <div className="addTaxContainer">
                        <div className="inputContainer">
                            <select>
                                <option
                                    key="0"
                                    value="none"
                                    onChange={() => {
                                        setCountry("none");
                                        console.log(country);
                                    }}
                                >
                                    -- Select Country --
                                </option>
                                <option
                                    key="1"
                                    value="canada"
                                    onChange={() => {
                                        setCountry("canada");
                                        console.log(country);
                                    }}
                                >
                                    Canada
                                </option>
                                <option
                                    key="2"
                                    value="india"
                                    onChange={() => {
                                        setCountry("india");
                                        console.log("changed");
                                    }}
                                >
                                    India
                                </option>
                            </select>
                        </div>
                        <div className="inputContainer">
                            <select>
                                <option>-- Select State --</option>
                                {states.india.map((item) => (
                                    <option key={item.slno} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={searchTax}>Search</button>
                    </div>
                    <div></div>
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
                                type="number"
                                placeholder="%"
                                min="0"
                                value={taxPercent}
                                onChange={(e) => {
                                    settaxPercent(e.target.value);
                                }}
                            />
                        </div>
                        <button onClick={addTax}>Add Tax</button>
                    </div>
                    <div className="saveButton">
                        <button onClick={addTax}>Save</button>
                    </div>
                </div>
                <hr />

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
                </div>
            </div>
            <div className="footer">
                <MobileNavigationBottom />
            </div>
        </div>
    );
};

export default TaxManagement;
