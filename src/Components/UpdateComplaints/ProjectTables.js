import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { TokenContext } from "../../TokenContext";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";

function ProjectTables() {
  const [complaints, setComplaints] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [customerNames, setCustomerNames] = useState({});
  const adminid = localStorage.getItem('adminid');

  useEffect(() => {
    fetchComplaints()
    .then(() => fetchCustomerNames())
    .catch((error) => {
      console.error("Error:", error);
    });
  }, []);

  const fetchComplaints = () => {
    return fetch(`http://localhost:8080/auth/admin/${adminid}`, {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setComplaints(data.complaints))
      .catch((error) => console.error("Error:", error));
  };

  const getRandomUserImage = () => {
    const users = [user1, user2, user3, user4, user5];
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
  };

  const fetchCustomerNames = () => {
    const customerIds = complaints.map((complaint) => complaint.customerid);

    Promise.all(
      customerIds.map((customerid) =>
        fetch(`http://localhost:8080/auth/customer/${customerid}`, {
          credentials: 'include',
        })
          .then((response) => response.json())
          .then((data) => ({
            customerid: customerid,
            name: data.name,
          }))
      )
    )
      .then((customerInfoArray) => {
        const customerInfoMap = {};
        customerInfoArray.forEach((info) => {
          customerInfoMap[info.customerid] = info.name;
        });
        setCustomerNames(customerInfoMap);
      })
      .catch((error) => console.error("Error:", error));
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
                complaints.map((complaint, index) => (
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
                    <td>{complaint.date}</td>
                    <td>{complaint.complaintType}</td>
                    <td>{complaint.description}</td>
                    <td>{complaint.status}</td>
                    <td>
                      {complaint.status === "Pending" ? (
                        <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                      ) : complaint.status === "Cancelled" ? (
                        <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                      ) : (
                        <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No complaints available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default ProjectTables;