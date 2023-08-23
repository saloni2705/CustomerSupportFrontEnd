import React, { useState } from "react";
import Sidebar from '../Sidebar';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddFAQsPage() {
  const [faq, setFAQ] = useState({
    faqType: "",
    question: "",
    answer: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is blank
    if (!faq.faqType || !faq.question || !faq.answer) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/admin/addFaqs", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // Include credentials in the request
        },
        body: JSON.stringify([faq]),
      });

      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessage(responseData.message);
        setFAQ({ faqType: "", question: "", answer: "" });
        setErrorMessage(""); // Clear any previous error message

        // Display success popup for a few seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleInputChange = (field, value) => {
    setFAQ((prevFAQ) => ({
      ...prevFAQ,
      [field]: value,
    }));
  };

  return (
    <div>
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0 sidebar">
          <Sidebar />
        </div>
        <div className="col-md-9 p-4">
          <div
            className="bg-white p-5 rounded shadow"
            style={{
              backgroundColor: "#ffffff",
              maxWidth: "800px",
              margin: "0 auto",
              padding: "30px",
              borderRadius: "10px",
              border: "1px solid #ddd"
            }}
          >
            <h1 className="mb-4" style={{ color: "#ac2358" }}>
              Add FAQ
            </h1>
            {successMessage && (
              <p className="text-success" style={{ color: "#333" }}>
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p className="text-danger" style={{ color: "red" }}>
                {errorMessage}
              </p>
            )}
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
              <div style={{ position: "relative" }}>
                <select
                  className="form-control"
                  value={faq.faqType}
                  onChange={(e) => handleInputChange("faqType", e.target.value)}
                  style={{ fontSize: "16px", padding: "10px" }}
                >
                  <option value="">Select FAQ Type</option>
                  <option value="Login and Account">Login and Account</option>
                  <option value="Transaction">Transaction</option>
                  <option value="Balance">Balance</option>
                  <option value="Card and ATM">Card and ATM</option>
                  <option value="Personal Information">Personal Information</option>
                  <option value="Loans and Mortgages">Loans and Mortgages</option>
                  <option value="Technical Issues">Technical Issues</option>
                  <option value="Account Maintenance">Account Maintenance</option>
                  <option value="Security">Security</option>
                  <option value="Account Closure">Account Closure</option>
                  <option value="Billing and Fees">Billing and Fees</option>
                </select>
                <div style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>&#9660;</div>
              </div>
              </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={faq.question}
              placeholder="Question"
              onChange={(e) => handleInputChange("question", e.target.value)}
              style={{ fontSize: "16px" }} 
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              value={faq.answer}
              placeholder="Answer"
              onChange={(e) => handleInputChange("answer", e.target.value)}
              rows="6" 
              style={{ fontSize: "16px" }} 
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              borderRadius: "5px",
              backgroundColor: "#ac2358",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "16px" 
            }}
          >
            Add FAQ
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
</div>
  );
}

export default AddFAQsPage;