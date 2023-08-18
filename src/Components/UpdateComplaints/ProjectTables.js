import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";

function ProjectTables() {
  const [complaints, setComplaints] = useState([]);
  const [customerNames, setCustomerNames] = useState({});
  const adminid = localStorage.getItem('adminid');
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    fetchComplaints();
    fetchCustomerNames();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch(`http://localhost:8080/auth/admin/${adminid}`, {
        credentials: 'include',
      });
      const data = await response.json();
      setComplaints(data.complaints);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getRandomUserImage = () => {
    const users = [user1, user2, user3, user4, user5];
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
  };

  const fetchCustomerNames = async () => {
    try {
      const customerIds = complaints.map((complaint) => complaint.customerid);

      const customerInfoArray = await Promise.all(
        customerIds.map(async (customerid) => {
          const response = await fetch(`http://localhost:8080/auth/customer/${customerid}`, {
            credentials: 'include',
          });
          const data = await response.json();
          return {
            customerid: customerid,
            name: data.name,
          };
        })
      );

      const customerInfoMap = {};
      customerInfoArray.forEach((info) => {
        customerInfoMap[info.customerid] = info.name;
      });
      setCustomerNames(customerInfoMap);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleStatusUpdate = (complaintid, status) => {
    let endpoint = `http://localhost:8080/auth/admin/updateComplaint/${complaintid}`;
  
    const requestBody = {
      status: status // Add other fields if needed
    };
  
    fetch(endpoint, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          setStatusMessage(`Success: Complaint ${complaintid} status is set to: ${status}`);
          fetchComplaints();
        } else {
          alert("Complaint did not update");
        }
      });
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Customer Complaints</CardTitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Date</th>
                <th>Complaint Type</th>
                <th>Description</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {complaints && complaints.length > 0 ? (
                complaints
                  .filter((complaint) => complaint.status === "Pending")
                  .map((complaint, index) => (
                    <tr key={index} className="border-top">
                      <td>
                        <div className="d-flex align-items-center p-2">
                          <img
                            src={getRandomUserImage()}
                            className="rounded-circle"
                            alt="avatar"
                            width="45"
                            height="45"
                          />
                          <div className="ms-3">
                            <span className="text-muted">{customerNames[complaint.customerid]}</span>
                          </div>
                        </div>
                      </td>
                      <td>{formatDate(complaint.date)}</td>
                      <td>{complaint.complaintType}</td>
                      <td>{complaint.description}</td>
                      <td>
                        <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                      </td>
                      <td>
                        <button
                          className="btn btn-success mr-2"
                          onClick={() => handleStatusUpdate(complaint.complaintid, "Resolved")}
                        >
                          Resolved
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="6">No pending complaints available</td>
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

export default ProjectTables;