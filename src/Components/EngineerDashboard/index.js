import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState , useContext, useEffect} from "react";
import { TokenContext } from "../../TokenContext";


function  EngineerDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/admin/6');
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
      <h1>API Response Example</h1>
      {data ? (
        <div>
          <p>ID: {data.id}</p>
          <p>Username: {data.username}</p>
          <p>Email: {data.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


export default EngineerDashboard;
