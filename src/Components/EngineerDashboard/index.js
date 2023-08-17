import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState , useContext, useEffect} from "react";
import { TokenContext } from "../../TokenContext";


function  EngineerDashboard() {
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
      <h1>Engineer Dashboard</h1>
      {data ? (
        <div>
          <p>ID: {data.adminid}</p>
          <p>Username: {data.name}</p>
          <p>Email: {data.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


export default EngineerDashboard;