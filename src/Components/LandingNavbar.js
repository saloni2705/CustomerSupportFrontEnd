import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

function LandingNavbar({ loggedIn }) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  return (
    <nav style={{ backgroundColor: "#98144d", padding: "15px 20px", position: "relative" }}>
      {/* Logo */}
      <div style={{ position: "absolute", top: "15px", left: "20px" }}>
        <img src="/img/Axis Bank.png" alt="Logo" style={{ width: "120px", marginTop: "-7px" }} />
      </div>

      <div style={{ position: "relative", display: "flex" }}>
        {/* Cut Effect */}
        <div style={{ width: "55%", height: "100%", backgroundColor: "#98144d" }}></div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", justifyContent: "flex-end", zIndex: 2 }}>
          {/*Link to About section*/}
        <li style={{ marginLeft: "20px" }}>
          <ScrollLink to="about" smooth={true} duration={1000} style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            About
          </ScrollLink>
        </li>
        {/*Link to Services section*/}
        <li style={{ marginLeft: "20px" }}>
          <ScrollLink to="services" smooth={true} duration={1000} style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            Services
          </ScrollLink>
        </li>
        {/*Link to Gallery section*/}
        <li style={{ marginLeft: "20px" }}>
          <ScrollLink to="portfolio" smooth={true} duration={1000} style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            Gallery
          </ScrollLink>
        </li>
        {/*Link to FAQ section*/}
        <li style={{ marginLeft: "20px" }}>
          <ScrollLink to="faqs" smooth={true} duration={1000} style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            FAQ
          </ScrollLink>
        </li>
        {/*Link to Chat section*/}
        <li style={{ marginLeft: "20px" }}>
          <ScrollLink to="chat-component" smooth={true} duration={1000} style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            Chat
          </ScrollLink>
        </li>
        {/*Link to Post Complaint Section*/}
        <li style={{ marginLeft: "20px" }}>
        <RouterLink
          to="/AddComplaints" 
          style={{
            color: "#fff",
            textDecoration: "none",
            transition: "color 0.3s",
            fontSize: "16px",
          }}
        >
          Complaints
        </RouterLink>
       </li> 
        {/*Link to Contact section*/}
        <li style={{ marginLeft: "20px" }}>
          <ScrollLink to="contact" smooth={true} duration={1000} style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            Contact
          </ScrollLink>
        </li>

        <li style={{ marginLeft: "650px" }}></li>
    
        {/*Render user-specific options*/}
        {loggedIn ? (
          <li style={{ marginLeft: "20px", position: "relative" }}>
            <button
              onClick={toggleUserDropdown}
              style={{
                color: "#fff",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                display: "flex", // Add this
                alignItems: "center", 
              }}
            >
              <i className="fa fa-user-circle" style={{ marginRight: "5px" }} /> User
            </button>
            {showUserDropdown && (
              <ul
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  background: "#ac2358",
                  listStyle: "none",
                  padding: "10px",
                  boxShadow: "0 4px 6px rgba(152,20,77,0.5)",
                  zIndex: 1,
                  width: "120px"
                }}
              >
                <li>
                  <RouterLink
                    to="/updateUser"
                    style={{ color: "#fff", textDecoration: "none", fontSize: "16px" }}
                  >
                    Update User
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to="/logout"
                    style={{ color: "#fff", textDecoration: "none", fontSize: "16px" }}
                  >
                    Logout
                  </RouterLink>
                </li>
              </ul>
            )}
          </li>
        ) : (
          <li style={{ marginLeft: "20px" }}>
            <RouterLink
              to="/login"
              style={{
                color: "#fff",
                textDecoration: "none",
                transition: "color 0.3s",
                fontSize: "16px",
              }}
            >
              Login
            </RouterLink>
          </li>
        )}

        
        {/*Add some space from the left corner*/}
        <li style={{ marginLeft: "40px" }}></li>
          </ul>
        </div>
      
    </nav>
  );
}

export default LandingNavbar;