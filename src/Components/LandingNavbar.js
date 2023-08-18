import React from "react";
import { Link as ScrollLink} from "react-scroll"; // Same page scrolling
import { Link as RouterLink} from "react-router-dom"; //Different page scrolling

function LandingNavbar() {
  return (
    <nav style={{ backgroundColor: "#ac2358", padding: "15px 20px", boxShadow: "0 4px 6px rgba(152,20,77,255)" }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", justifyContent: "flex-end" }}>
        {/* Link to About section */}
        <li style={{ marginLeft: "20px" }}>
          <ScrollLink to="about" smooth={true} duration={1000} style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            About
          </ScrollLink>
        </li>
        {/* Link to Services section */}
        <li style={{ marginLeft: "20px" }}>
          <ScrollLink to="services" smooth={true} duration={1000} style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            Services
          </ScrollLink>
        </li>
        {/* Link to Gallery section */}
        <li style={{ marginLeft: "20px" }}>
          <ScrollLink to="portfolio" smooth={true} duration={1000} style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            Gallery
          </ScrollLink>
        </li>
        {/* Link to FAQ section */}
        <li style={{ marginLeft: "20px" }}>
          <ScrollLink to="faqs" smooth={true} duration={1000} style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            FAQ
          </ScrollLink>
        </li>
        {/* Link to Chat section */}
        <li style={{ marginLeft: "20px" }}>
          <ScrollLink to="chat-component" smooth={true} duration={1000} style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            Chat
          </ScrollLink>
        </li>
        {/* Link to Post Complaint Section*/}
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
          Post Complaint
        </RouterLink>
    </li>
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
        {/* Link to Contact section */}
        <li style={{ marginLeft: "20px" }}>
          <ScrollLink to="contact" smooth={true} duration={1000} style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            Contact
          </ScrollLink>
        </li>
        {/* Add some space from the left corner */}
        <li style={{ marginLeft: "40px" }}></li>
      </ul>
    </nav>
  );
}

export default LandingNavbar;
