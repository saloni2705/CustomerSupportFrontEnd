import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";
import Register from "./Components/Register/Register";
import CustomerDashboard from "./Components/CustomerDashboard/CustomerDashboard";
import EngineerDashboard from "./Components/EngineerDashboard";
import TokenContextProvider from "./TokenContext";
import Header from "./Components/Header";// Import the Header component
import { LandingHeader } from "./Components/LandingHeader"; // Import the LandingHeader component
import { About } from "./Components/about";
import { Services } from "./Components/service";
import { Gallery } from "./Components/gallery";
import { Testimonials } from "./Components/testimonials";
import { Team } from "./Components/Team";
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
        {/* Use the Header component */}
        <Header />
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
    <Testimonials data={landingPageData.Testimonials} />
    <Team data={landingPageData.Team} />
    <Contact data={landingPageData.Contact} />
  </div>
);

export default App;
