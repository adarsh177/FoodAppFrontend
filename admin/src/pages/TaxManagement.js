import React, { useState, useMemo, useEffect } from "react";
import {
  Navigation,
  MobileNavigationTop,
  MobileNavigationBottom,
} from "../components/navigation/navigation";
import "./css/TaxManagement.css";

// external package -----------------------------------------------

import Select from "react-select";
import { Item } from "rc-menu";
import { GetTaxInfo, PutTaxInfo } from "../APIs/AdminManager";
const states = require("../assets/states.json");

const TaxManagement = () => {
  const [country, setCountry] = useState("none");
  const [state, setState] = useState("none");
  const [taxPercent, settaxPercent] = useState();
  const [taxName, settaxName] = useState();
  const [taxInfo, setTaxInfo] = useState({});
  const [selectedTaxInfo, setSelectedTaxInfo] = useState([]);

  const saveAll = () => {
    const data = taxInfo;
    data[country == "india" ? "India" : "Canada"][state] = selectedTaxInfo;
    PutTaxInfo(data)
      .then(() => {
        alert("Tax saved");
        loadGlobalTaxInfo();
      })
      .catch((err) => {
        alert(`Error saving tax: ${err}`);
      });
  };

  const addTax = (e) => {
    e.preventDefault();
    if (!taxName || !taxPercent) {
      window.alert("add all fields of tax");
    } else {
      setSelectedTaxInfo((info) => {
        return [
          ...info,
          {
            name: taxName,
            percent: taxPercent,
          },
        ];
      });
      settaxPercent("");
      settaxName("");
    }
  };

  const deleteTax = (item) => {
    console.log("Deleting", item, selectedTaxInfo);
    setSelectedTaxInfo((info) => {
      return info.filter((val) => {
        return val.name != item.name;
      });
    });
  };

  const searchTax = () => {
    const countryName = country == "india" ? "India" : "Canada";
    const stateName = state.startsWith("common-") ? "common" : state;

    console.log("Search", countryName, stateName);

    let data = taxInfo[countryName][stateName];
    if (data == null || data == undefined) data = [];

    setSelectedTaxInfo(data);
  };

  const loadGlobalTaxInfo = () => {
    GetTaxInfo()
      .then((val) => {
        setTaxInfo(val);
        console.log("Tax", val);
      })
      .catch((err) => {
        alert(`Error loading tax information.\n${err}`);
      });
  };

  useEffect(() => {
    loadGlobalTaxInfo();
  }, []);

  useEffect(() => {
    if (country !== "none") searchTax();
  }, [state]);

  return (
    <div className="nav-container">
      <Navigation />
      <MobileNavigationTop />
      <div className="main">
        <h1>Tax Management</h1>
        <div>
          <div className="addTaxContainer">
            <div className="inputContainer">
              <select
                value={country}
                onChange={(ev) => {
                  setCountry(ev.target.value);
                  setState("none");
                  setState(`common-${ev.target.value}`);
                }}
              >
                <option key="0" value="none">
                  -- Select Country --
                </option>
                <option key="1" value="canada">
                  Canada
                </option>
                <option key="2" value="india">
                  India
                </option>
              </select>
            </div>
            <div className="inputContainer">
              {country !== "none" && (
                <select
                  value={state.startsWith("common-") ? "common" : state}
                  onChange={(ev) => {
                    setState(
                      ev.target.value.startsWith("common-")
                        ? "common"
                        : ev.target.value
                    );
                    console.log(country, ev.target.value);
                  }}
                >
                  <option key={-1} value={`common-${country}`}>
                    Common for all
                  </option>
                  {states[country].map((item) => (
                    <option key={item.slno} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className="addTaxContainer">
            <div className="tagsOuterContainer">
              {selectedTaxInfo.map((item) => {
                return (
                  <div className="tagsContainer flex-row">
                    <p>{item.name} : </p>
                    <p>{item.percent}%</p>
                    <button
                      className="deleteTabButton"
                      onClick={(ev) => {
                        ev.preventDefault();
                        deleteTax(item);
                      }}
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                );
              })}
              {selectedTaxInfo.length == 0 && country !== "none" && (
                <p>
                  No tax info available for{" "}
                  {state.startsWith("common-") ? "common" : state}, {country}
                </p>
              )}
            </div>
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
          <hr />
          <div className="saveButton">
            <button onClick={saveAll}>Save</button>
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
