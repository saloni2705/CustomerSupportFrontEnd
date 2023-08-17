import React, { useState ,useContext} from "react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import TokenContext from "../../TokenContext";
import { Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <Navbar.Brand href="#home">
            <img
              src="/logo512.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="logo"
            />{' '}
            Engineer Dashboard
          </Navbar.Brand>        
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
        </li>

      </ul>
      <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        </ul>
    </div>
  </nav>
  );
}

export default Header;