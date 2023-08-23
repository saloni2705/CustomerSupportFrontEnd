/*import React, { useState, useEffect } from "react";
import { TokenContext } from "../../TokenContext";
import Sidebar from "../Sidebar";
import EngineerDashboardHeader from "../Header/EngineerDasboardHeader";

function EngineerDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/admin/1', {
          credentials: 'include', // Set withCredentials to true
        });

        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {window.location.pathname.startsWith("/login/EngineerDashboard") && (
        <EngineerDashboardHeader />
      )}
      <div style={{ display: "flex" }}>
        <Sidebar />
      </div>
    </div>
  );
}

export default EngineerDashboard;*/
import React, { useState, useEffect } from "react";
import { TokenContext } from "../../TokenContext";
import Sidebar from "../Sidebar";
import EngineerDashboardHeader from "../Header/EngineerDasboardHeader";
import UpdateComplaints from "../UpdateComplaints/UpdateComplaints"; // Import the UpdateComplaints component

function EngineerDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/admin/1', {
          credentials: 'include', // Set withCredentials to true
        });

        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {window.location.pathname.startsWith("/login/EngineerDashboard") && (
        <EngineerDashboardHeader />
      )}
      <div style={{ display: "flex" }}>
        
        {/* Render the content for Update Complaints */}
        <UpdateComplaints />
      </div>
    </div>
  );
}

export default EngineerDashboard;
