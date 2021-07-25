import React, { useState } from "react";
import logo from "../../assets/logo.png";
import "./navigation.css";
import { NavLink } from "react-router-dom";

const logoutUser = () => {
   return null;
};

export const Navigation = (props) => {
   const [slide, setSlide] = useState("burger");
   const showSlide = () => {
      setSlide("cross");
   };
   const hideSlide = () => {
      setSlide("burger");
   };

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
               to="/users"
            >
               <div className="nav-icon">
                  <i class="fas fa-user-cog"></i>
               </div>
               <div className={`nav-link-item ${slide}-nav-link-item `}>
                  User Management
               </div>
            </NavLink>
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
   return (
      <React.Fragment>
         <div className="mobile-navigation">
            <div className="top">
               <div className="mobile-logo">
                  <img src={logo} alt="Logo" />
               </div>
               <div className="mobile-logout">
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
                     activeClassName="activenav"
                     className="mobile-nav-icon"
                     to="/tax"
                  >
                     <i class="fas fa-clipboard-list"></i>
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
