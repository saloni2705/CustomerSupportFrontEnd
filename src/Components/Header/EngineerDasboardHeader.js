import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <Link to="/" style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            <FontAwesomeIcon icon={faHome} style={{ marginLeft: "1210px" }} />
          </Link>
      
    </Navbar>
  );
}

export default EngineerDashboardHeader;