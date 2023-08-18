import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";
import Register from "./Components/Register/Register";
import CustomerDashboard from "./Components/CustomerDashboard/CustomerDashboard";
import EngineerDashboard from "./Components/EngineerDashboard/EngineerDasboard";
import TokenContextProvider from "./TokenContext";
import Header from "./Components/Header/EngineerDasboardHeader"; 
import { LandingHeader } from "./Components/LandingHeader"; 
import { About } from "./Components/about";
import { Services } from "./Components/service";
import { Gallery } from "./Components/gallery";
import FAQComponent from "./Components/FAQComponent";
import ChatComponent from "./Components/ChatComponent";
import { Contact } from "./Components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import { Table } from 'reactstrap';
import UpdateComplaints from './Components/UpdateComplaints/UpdateComplaints';
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);

    // Retrieve the token from local storage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <TokenContextProvider>
      <Router>
        
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login/CustomerDashboard"
            element={<CustomerDashboard />}
          />
          <Route
            path="/login/EngineerDashboard"
            element={<EngineerDashboard />}
          />
          <Route path="/login/EngineerDashboard/updateComplaints" element={<UpdateComplaints/>} />
          <Route
            path="/"
            element={
              <MainPage
                landingPageData={landingPageData}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route path="/faqs" element={<FAQComponent />} />
        </Routes>
      </Router>
    </TokenContextProvider>
  );
}

const MainPage = ({ landingPageData }) => (
  <div>
    <LandingHeader data={landingPageData.LandingHeader} />
    <About data={landingPageData.About} />
    <Services data={landingPageData.Services} />
    <Gallery data={landingPageData.Gallery} />
    <FAQComponent />
    <ChatComponent />
    <Contact data={landingPageData.Contact} />
  </div>
);

export default App;
