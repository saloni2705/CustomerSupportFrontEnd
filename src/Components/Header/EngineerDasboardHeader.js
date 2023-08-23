import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

function EngineerDashboardHeader() {
  return (
    <Navbar style={{ backgroundColor: "#98144d", padding: "5px 20px", position: "relative" }} expand="lg" variant="dark">
      <Link to="/" className="navbar-brand">
        <img
          src="/img/Axis Bank.png"
          width="150"
          height="45"
          className="d-inline-block align-top"
          alt="logo"
        />
      </Link>
      
    </Navbar>
  );
}

export default EngineerDashboardHeader;
