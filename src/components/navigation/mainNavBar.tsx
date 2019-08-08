import React from "react";
import { NavLink } from "react-router-dom";

import "./mainNavBar.css";

/** Navigation bar component */
const MainNavBar = () => {
  return (
    <header id="MainNavBar">
      <div className="main-navbar-title main-navbar-logo">
        <h1>gEvent</h1>
      </div>
      <nav className="main-navbar-items">
        <ul>
          <NavLink to="/auth">Authenticate</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/bookings">Bookings</NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavBar;
