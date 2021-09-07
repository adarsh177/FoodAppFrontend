import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import "./navigation.css";
import { NavLink } from "react-router-dom";
import FirebaseUtil from "../../Utils/FirebaseUtil";
import { CheckAdmin } from "../../APIs/AdminManager";

export const Navigation = (props) => {
    const [slide, setSlide] = useState("burger");
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const FirebaseApp = new FirebaseUtil().app();

    const showSlide = () => {
        setSlide("cross");
    };
    const hideSlide = () => {
        setSlide("burger");
    };

    const logoutUser = async () => {
        await FirebaseApp.auth().signOut();
        window.location = "./";
    };

    useEffect(() => {
        CheckAdmin().then((data) => {
            console.log("Admin", data);
            setIsSuperAdmin(data.superAdmin);
        });
    }, []);

    return (
        <React.Fragment>
            <div className={`navigation ${slide}-navigation`}>
                <div
                    className={`nav-hamburger ${slide}-hide-burger`}
                    onClick={showSlide}
                >
                    <i class="fas fa-bars"></i>
                </div>
                <div
                    className={`nav-cross ${slide}-hide-cross`}
                    onClick={hideSlide}
                >
                    <i class="fas fa-times"></i>
                </div>
                <div className={`nav-logo ${slide}-nav-logo`}>
                    <img src={logo} alt="Logo" />
                </div>

                {slide === "cross" && (
                    <p
                        style={{
                            alignSelf: "center",
                            fontWeight: "bold",
                            color: "#fff",
                        }}
                    >
                        {FirebaseApp.auth().currentUser.phoneNumber}
                    </p>
                )}

                <NavLink
                    className="nav-links"
                    activeClassName="activenav"
                    to="/stats"
                >
                    <div className="nav-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div className={`nav-link-item ${slide}-nav-link-item `}>
                        Stats
                    </div>
                </NavLink>
                <NavLink
                    className="nav-links"
                    activeClassName="activenav"
                    to="/tax"
                >
                    <div className="nav-icon">
                        <i class="fas fa-clipboard-list"></i>
                    </div>
                    <div className={`nav-link-item ${slide}-nav-link-item `}>
                        Tax management
                    </div>
                </NavLink>
                <NavLink
                    className="nav-links"
                    activeClassName="activenav"
                    to="/payout"
                >
                    <div className="nav-icon">
                        <i class="fas fa-money-check-alt"></i>
                    </div>
                    <div className={`nav-link-item ${slide}-nav-link-item `}>
                        Payouts
                    </div>
                </NavLink>

                {isSuperAdmin ? (
                    <NavLink
                        className="nav-links"
                        activeClassName="activenav"
                        to="/users"
                    >
                        <div className="nav-icon">
                            <i class="fas fa-user-cog"></i>
                        </div>
                        <div
                            className={`nav-link-item ${slide}-nav-link-item `}
                        >
                            User Management
                        </div>
                    </NavLink>
                ): null}

                <NavLink
                    className="nav-links"
                    activeClassName="activenav"
                    to="/config"
                >
                    <div className="nav-icon">
                        <i class="fas fa-cogs"></i>
                    </div>
                    <div className={`nav-link-item ${slide}-nav-link-item `}>
                        Configuration
                    </div>
                </NavLink>
                <NavLink
                    className="nav-links"
                    activeClassName="activenav"
                    to="/feedback"
                >
                    <div className="nav-icon">
                        <i class="fas fa-comment-dots"></i>
                    </div>
                    <div className={`nav-link-item ${slide}-nav-link-item `}>
                        Feedback
                    </div>
                </NavLink>
                <div className="nav-logout" onClick={logoutUser}>
                    <div className="nav-icon">
                        <i class="fas fa-sign-out-alt"></i>
                    </div>
                    <div className={`nav-link-item ${slide}-nav-link-item`}>
                        Log Out
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export const MobileNavigationTop = () => {
    const FirebaseApp = new FirebaseUtil().app();
    const logoutUser = async () => {
        await FirebaseApp.auth().signOut();
        window.location = "./";
    };

    return (
        <React.Fragment>
            <div className="mobile-navigation">
                <div className="top">
                    <div className="mobile-logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="mobile-logout " onClick={logoutUser}>
                        <i class="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export const MobileNavigationBottom = () => {
    return (
        <React.Fragment>
            <div className="mobile-navigation">
                <div className="bottom">
                    <div className="mobile-nav-links">
                        <NavLink
                            activeClassName="activenav"
                            className="mobile-nav-icon"
                            to="/stats"
                        >
                            <i class="fas fa-chart-line"></i>
                        </NavLink>
                        <NavLink
                            className="mobile-nav-icon"
                            activeClassName="activenav"
                            to="/tax"
                        >
                            <i class="fas fa-clipboard-list"></i>
                        </NavLink>
                        <NavLink
                            className="mobile-nav-icon"
                            activeClassName="activenav"
                            to="/payout"
                        >
                            <i class="fas fa-money-check-alt"></i>
                        </NavLink>
                        <NavLink
                            activeClassName="activenav"
                            className="mobile-nav-icon"
                            to="/users"
                        >
                            <i class="fas fa-user-cog"></i>
                        </NavLink>
                        <NavLink
                            activeClassName="activenav"
                            className="mobile-nav-icon"
                            to="/config"
                        >
                            <i class="fas fa-cogs"></i>
                        </NavLink>
                        <NavLink
                            activeClassName="activenav"
                            className="mobile-nav-icon"
                            to="/feedback"
                        >
                            <i class="fas fa-comment-dots"></i>
                        </NavLink>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
