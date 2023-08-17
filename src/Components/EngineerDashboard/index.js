import React, { useState, useEffect } from "react";
import { TokenContext } from "../../TokenContext";
import Sidebar from "../Sidebar";

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
      
     <div style={{ display: "flex" }}>
        <Sidebar />
        <div>

        </div>
      </div>
    </div>
  );
}


export default EngineerDashboard;