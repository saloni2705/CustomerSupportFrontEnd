import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

function AddComplaints() {
  const navigate = useNavigate();
  const[description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");
  const customerid = localStorage.getItem('id');

  const handleAdd = (e) => {
    e.preventDefault();

    const requestBody = {
        description: description // Add other fields if needed
      };

    fetch(`http://localhost:8080/auth/customer/${customerid}/add-complaint`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          setSuccessMessage("Complaint added successfully"); // Set the success message
          setTimeout(() => {
            setSuccessMessage(""); // Hide the success message after 3 seconds

          }, 2000);
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
                margin: "0 auto",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid #ddd"
              }}
            >
              <h1 className="mb-4" style={{ color: "#ac2358" }}>
                Add Complaint
              </h1>
              <h5 className="card-title" style={{ textTransform: 'lowercase' }}>What can I help you with?</h5>

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
                    color: "#fff",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Add Complaint
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default AddComplaints;