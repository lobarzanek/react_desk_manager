import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Profile from "../../assets/images/profile.png";
import "./navbar.scss";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="left-side">
          <img className="logo" src={Logo} alt="" />
          <div className="links">
            <NavLink className="nav-link" to="/">
              home
            </NavLink>
            <NavLink className="nav-link" to="/history">
              moje rezerwacje
            </NavLink>
            <NavLink className="nav-link" to="/issue">
              zgłoś usterke
            </NavLink>
          </div>
        </div>
        <div className="right-side">
          <span>John Doe</span>
          <img className="user" src={Profile} alt="" />
        </div>
      </div>
    );
  }
}

export default Navbar;
