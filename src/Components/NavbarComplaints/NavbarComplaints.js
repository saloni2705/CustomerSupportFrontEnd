import React ,{ useState }from "react";
import { Link as ScrollLink} from "react-scroll"; // Same page scrolling
import { NavLink, Link as RouterLink} from "react-router-dom"; //Different page scrolling
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavbarComplaints({ loggedIn }) {
   const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  return (
    <nav style={{ backgroundColor: "#ac2358", padding: "15px 20px", boxShadow: "0 4px 6px rgba(152,20,77,255)" }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", justifyContent: "flex-end" }}>
        {/* Link to ViewComplaints */}
        <li style={{ marginLeft: "20px" }}>
          <NavLink to="/ViewComplaints" style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            View Complaints
          </NavLink>
        </li>
        {/* Link to AddComplaints */}
        <li style={{ marginLeft: "20px" }}>
          <NavLink to="/AddComplaints" style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            Add Complaints
          </NavLink>
        </li>
        {/* Add some space from the left corner */}
        <li style={{ marginLeft: "auto" }}></li>
        <NavLink to="/" style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            <FontAwesomeIcon icon={faHome} style={{ marginRight: "5px" }} />
          </NavLink>
          <li style={{ marginLeft: "70px" }}></li>
      </ul>
    </nav>
  );
}

export default NavbarComplaints;