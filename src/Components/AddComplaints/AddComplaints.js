import React, { useState, useContext , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import './AddComplaints.css';
import NavbarComplaints from "../NavbarComplaints/NavbarComplaints";

function AddComplaints({ userData }) {
  const navigate = useNavigate();
  const[description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");
  const customerid = localStorage.getItem('customerid');
  const [response, setResponse] = useState("");
  const[faqs, setFaqs] = useState([]);
  const [otherDescription, setOtherDescription] = useState("");
  

  useEffect(() => {
    // Fetch FAQs from the server
    fetch("http://localhost:8080/auth/customer/getAllFaqs")
      .then((response) => response.json())
      .then((data) => {
        setFaqs(data);
      })
      .catch((error) => {
        console.error("Error fetching FAQs:", error);
      });
  }, []);

  let requestBody = {
    description: description, 
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!description) {
      setErrorMessage("Description cannot be empty.");
      return;
    }
   
    if (description === "Other") {
      if (!otherDescription) {
        setErrorMessage("Other description cannot be empty.");
        return;
      }
      requestBody = {
        description: otherDescription, // Use otherDescription if description is "Other"
      };
    }
  

    fetch(`http://localhost:8080/auth/customer/${customerid}/add-complaint`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
    .then(async (response) => {
      const responseBody = await response.json(); // Parse the response body as JSON
      if (response.ok) {
        setSuccessMessage(`${responseBody.adminName} has been assigned to your complaint`);
        setResponse(responseBody.message);
        setFaqs(responseBody.faqs); // Extract the message from the response
        setTimeout(() => {
          setSuccessMessage("");
          setResponse("");
          // Update the state with FAQs
        }, 9000);
      } else {
        setErrorMessage("Error adding a complaint");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error adding a complaint");
    });
};
    return (
      <div >
        <NavbarComplaints />

      <div className="container-fluid">
        </div>
        <div className="col-md-12 p-4">
          <div
            className="bg-white p-5 rounded shadow"
            style={{
              backgroundColor: "#ffffff",
              maxWidth: "600px",
              margin: "5px auto",
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #ddd"
            }}
          >
            <h1 className="mb-4" style={{ color: "#ac2358" }}>
              Add Complaint
            </h1>
            <h3 className="card-title" style={{ textTransform: 'lowercase', margin: "20px auto" }}>What can I help you with?</h3>
            
            <form onSubmit={handleAdd}>
        <div className="mb-3">
        <select
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Login And Account">Account login issues</option>
            <option value="Incorrect transaction amount">Incorrect transaction amount</option>
            <option value="Simple balance inquiries">Simple balance inquiries</option>
            <option value="Lost or stolen card cases">Card and ATM</option>
            <option value="Address or contact information updates">Address or contact information updates</option>
            <option value="Urgent loan or mortgage inquiries">Urgent loan or mortgage inquiries</option>
            <option value="Technical issues on the bank's app or website">Technical issues on the bank's app or website</option>
            <option value="Account security concerns">Account security concerns</option>
            <option value="Billing or fee disputes">Billing or fee disputes</option>
            <option value="Other">Other</option>
          </select>
          {description === "Other" && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Enter description"
              value={otherDescription}
              onChange={(e) => setOtherDescription(e.target.value)}
            />
          )}
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  borderRadius: "5px",
                  backgroundColor: "#ac2358",
                  margin: "10px auto",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px"
                }}
              >
                Add Complaint
              </button>
            </form>
            
            {errorMessage && (
              <p className="text-danger" style={{ color: "red" }}>
                {errorMessage}
              </p>
            )}
      
            {response && (
              <p className="response-message" style={{ color: "#666" }}>
                {response}
              </p>
            )}

            {successMessage && (
              <p className="text-success" style={{ color: "#333" }}>
                {successMessage}
              </p>
            )}
          </div>
          
          <div id="faq" className="text-center">
            <div className="container">
              <div className="section-title">
                <h2>FAQs</h2>
              </div>
              <div className="accordion">
              {faqs && faqs.length > 0 ? (
                faqs.map((faq, index) => (
                  <details key={index} className="faq-item">
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))
              ) : (
                <p>No FAQs match your search.</p>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

  export default AddComplaints;