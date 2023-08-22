import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Table, InputGroup, InputGroupText, Input } from "reactstrap";
import './ComplaintTables.css';
import * as Mui from '@mui/material';

function ComplaintTables() {
  const [complaints, setComplaints] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const customerid = localStorage.getItem('customerid');
  const [rating, setRating] = useState(""); 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredComplaints, setFilteredComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    // Filter FAQs based on search query
    
    const filtered = complaints.filter((complaint) =>
      complaint.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredComplaints(filtered);
  }, [searchQuery, complaints]);

  const fetchComplaints = async () => {
    try {
      const response = await fetch(`http://localhost:8080/auth/customer/${customerid}`, {
        credentials: 'include',
      });
      const data = await response.json();
      setComplaints(data.complaints);
      setFilteredComplaints(data.complaints);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRating = (event, newValue, complaintid) => {

    let endpoint = `http://localhost:8080/auth/customer/rate/${complaintid}`;
  
    fetch(endpoint, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: newValue.toString(),
    })
      .then((response) => {
        if (response.ok) {
          setStatusMessage(`Thank you for your feedback `);
          fetchComplaints();
        } else {
          alert("Complaint did not update");
        }
      });
  };

  const handleCandcellation = (complaintid) => {

    let endpoint = `http://localhost:8080/auth/customer/${customerid}/cancel-complaint/${complaintid}`;
    
    fetch(endpoint, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setTimeout(() => setStatusMessage(""), 2000)
          setStatusMessage(`Complaint cancelled`);
          fetchComplaints();
        } else {
          alert("Complaint did not update");
        }
      });
  };

  return (
    <div >
      <Card className="custom-card" >
        <CardBody>
        <h1 className="mb-4" style={{ color: "#ac2358" }}>
              Previous Complaints
            </h1>
        <div className="search-bar" style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Search Complaints by status"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  width: "100%",
                  padding: "10px 30px 10px 10px",
                  fontSize: "16px",
                  backgroundImage: `url('img/search.png')`, 
                  backgroundSize: "40px 40px", 
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                  
                }}
              />
            </div>
          <Table className="custom-table no-wrap mt-3 align-middle" responsive borderless>
            <thead >
              <tr>
                <th>Complaint Id</th>
                <th>Description</th>
                <th>Date</th>
                <th>Status</th>
                <th>Cancel</th>
                <th>rating</th>
                
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints && filteredComplaints.length > 0 ? (
                filteredComplaints
                  .map((complaint, index) => (
                    <tr key={index} className="border-top">
                        <td>{complaint.complaintid}</td>
                        <td>{complaint.description}</td>
                        <td>{formatDate(complaint.date)}</td>
                      <td>
                      <span className={`status-badge ${complaint.status.toLowerCase()}`}>
                    <strong>{complaint.status}</strong>
                    </span>
                      </td>
                      <td>
                        {complaint.status === "Pending" &&
                        <button
                          className="btn btn-success mr-2"
                          onClick={() => handleCandcellation(complaint.complaintid, "Cancelled")}
                        >
                          Cancel Complaint
                        </button>
                        }
                        </td>
                      <td>
                      {complaint.status === "Resolved" && ( // Only render the Rating if status is "Pending"
                      <>
                        <Mui.Typography component="legend">
                          {complaint.rating === null ? "No rating given" : `Rating: ${complaint.rating}`}
                        </Mui.Typography>
                        <Mui.Rating
                          precision={0.5}
                          size="large"
                          name={index} // Use a unique name for each complaint
                          value={complaint.rating} // Display the complaint's existing rating
                          onChange={(event, newValue) => handleRating(event, newValue, complaint.complaintid)}
                        />
                      </>
                    )
                   }
                   </td>
                   

                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="6">No complaints</td>
                </tr>
              )}
            </tbody>
          </Table>

        </CardBody>
      </Card>
      {statusMessage && (
            <div className="mt-3">
              <div className="alert alert-success" role="alert">
                {statusMessage}
              </div>
            </div>
          )}
    </div>
  );
}

export default ComplaintTables;