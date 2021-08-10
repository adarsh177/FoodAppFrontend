import React, { useEffect, useState } from "react";
import {
    Navigation,
    MobileNavigationTop,
    MobileNavigationBottom,
} from "../components/navigation/navigation";
import "./css/Stats.css";

//external package for drop down

import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem, Divider } from "rc-menu";
import "rc-dropdown/assets/index.css";
import { GetStats } from "../APIs/AdminManager";
import FirebaseUtil from "../Utils/FirebaseUtil";
import { withRouter, Link } from "react-router-dom";

const Stats = (props) => {
    // handel notification button ------------------------------------------------

    const notification = () => {
        return null;
    };

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const FirebaseApp = new FirebaseUtil().app();

    const loadData = () => {
        setLoading(true);
        GetStats()
            .then((stats) => {
                setData(stats);
            })
            .catch(async (err) => {
                alert("Unauthorized: " + err);
                if (err === "UNAUTH") {
                    // logout and take outside
                    await FirebaseApp.auth().signOut();
                    props.history.push("./");
                }
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="nav-container">
            <Navigation />
            <MobileNavigationTop />
            <div className="main">
                <div>
                    <h3>Notification</h3>
                    <div className="detailsContainer">
                        <Link to="/nav">
                            <button
                                className="notificationButton"
                                onClick={notification}
                            >
                                Customer
                            </button>
                        </Link>
                        <Link to="/nav">
                            <button
                                className="notificationButton"
                                onClick={notification}
                            >
                                Merchant
                            </button>
                        </Link>
                    </div>
                </div>
                <div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="detailOuterContainer">
                            <h3>Stats</h3>

                            <div className="detailsContainer">
                                <h3 className="detailTitle">Total Orders : </h3>
                                <p className="details">{data.orderCount}</p>
                            </div>
                            <div className="detailsContainer">
                                <h3 className="detailTitle">
                                    Total customer :{" "}
                                </h3>
                                <p className="details">{data.customerCount}</p>
                            </div>
                            <div className="detailsContainer">
                                <h3 className="detailTitle">
                                    Total Merchant :{" "}
                                </h3>
                                <p className="details">{data.merchantCount}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="footer">
                <MobileNavigationBottom />
            </div>
        </div>
    );
};

export default withRouter(Stats);
