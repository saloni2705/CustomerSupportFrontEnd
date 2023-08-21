import React from "react";
import LandingNavbar from "./LandingNavbar";
import { Link } from "react-scroll"; 

export const LandingHeader = (props) => {
  console.log("Props in LandingHeader:", props);
  return (
    <header id="header">
      {/* Include the LandingNavbar here */}
      <LandingNavbar loggedIn={props.loggedIn}  />
      
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1 style={{ fontSize: "36px"}}>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                <a href="#services" className="btn btn-custom btn-lg page-scroll">
                  Learn More
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

