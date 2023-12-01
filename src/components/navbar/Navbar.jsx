import React, { Component } from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="left-side">
          <div className="logo"></div>
          <div className="links">
            <NavLink className="nav-link" to="/">
              home
            </NavLink>
            <NavLink className="nav-link" to="/history">
              historia zamówień
            </NavLink>
            <NavLink className="nav-link" to="/issue">
              zgłoś usterke
            </NavLink>
          </div>
        </div>
          <div className="right-side">
            <div className="user"></div>
          </div>
      </div>
    );
  }
}

export default Navbar;
