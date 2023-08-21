import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import './AddComplaints.css';

function AddComplaints({ userData }) {
  const navigate = useNavigate();
  const[description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");
  const customerid = localStorage.getItem('id');
  const [response, setResponse] = useState("");
  const[faqs, setFaqs] = useState([]);


  const handleAdd = (e) => {
    e.preventDefault();

    const requestBody = {
        description: description // Add other fields if needed
      };

    fetch(`http://localhost:8080/auth/customer/${userData.id}/add-complaint`, {
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
              maxWidth: "600px",
              margin: "30px auto",
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
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
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
                  <p>No FAQs available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  export default AddComplaints;