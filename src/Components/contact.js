import React from "react";

export const Contact = (props) => {
  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Contact Us</h2>
                <p>
                  Have questions or need assistance? Feel free to reach out to us.
                </p>
              </div>
              <div className="contact-info">
                <div className="contact-item">
                  <h3> <strong>Contact Info</strong> </h3>
                  <p>
                    <span>
                      <i className="fa fa-map-marker"></i> Address
                    </span>
                    {props.data ? props.data.address : "loading"}
                  </p>
                </div>
                <div className="contact-item">
                  <p>
                    <span>
                      <i className="fa fa-phone"></i> Phone
                    </span>{" "}
                    {props.data ? props.data.phone : "loading"}
                  </p>
                </div>
                <div className="contact-item">
                  <p>
                    <span>
                      <i className="fa fa-solid fa-envelope"></i> Email 
                    </span>{" "}
                    {props.data ? props.data.email : "loading"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3> <strong>Customer Support</strong> </h3>
              <p>
                We are here to assist you with any inquiries or issues you may have regarding our banking services.
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-clock-o"></i> Working Hours
                </span>{" "}
                Mon - Fri: 9:00 AM - 5:00 PM
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : "/"}>
                      <i className="fab fa-facebook"></i> 
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.twitter : "/"}>
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.youtube : "/"}>
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2023 Bank Customer Support Portal. Connect us at : {" "}
            <a href="www.customersupportportal45.com" rel="nofollow">
              Customer Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

