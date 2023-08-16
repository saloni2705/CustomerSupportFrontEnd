import logo from './logo.svg';
import './App.css';
import LoginPage from './Components/Login/LoginPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";
import Register from './Components/Register/Register';
import CustomerDashboard from './Components/CustomerDashboard/CustomerDashboard';
import TokenContextProvider from "./TokenContext";
import EngineerDashboard from './Components/EngineerDashboard';

function App() {
  const [token, setToken] = useState("");
  return (
  <div>
    <TokenContextProvider>
      <Router>
        <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/login/CustomerDashboard" element={<CustomerDashboard/>} />
        <Route path="/login/EngineerDashboard" element={<EngineerDashboard/>} />
        </Routes>
      </Router>
      </TokenContextProvider>
  </div>
  );
}

export default App;
