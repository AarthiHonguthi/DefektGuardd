import React from "react";
import { NavLink } from "react-router-dom";
import "./Layout.css";
import walmartLogo from "../assets/walmart.png";
import { FaHome, FaBarcode, FaBoxes, FaBell } from "react-icons/fa";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <img
          src={walmartLogo}
          alt="Walmart Logo"
          className="logo"
          style={{ width: "200px", height: "60px" }} // increase width as needed
        />

        <nav>
          <NavLink exact="true" to="/" activeclassname="active-link">
            <FaHome className="icon" />
            Home
          </NavLink>
          <NavLink to="/scan" activeclassname="active-link">
            <FaBarcode className="icon" />
            Scan
          </NavLink>
          <NavLink to="/inventory" activeclassname="active-link">
            <FaBoxes className="icon" />
            Inventory
          </NavLink>
          <NavLink to="/details" activeclassname="active-link">
            <FaBell className="icon" />
            Details
          </NavLink>
        </nav>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;
