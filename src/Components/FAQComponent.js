import React, { useState, useEffect } from "react";

const FAQComponent = () => {
  const [faqs, setFaqs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState([]);

  useEffect(() => {
    // Fetch FAQs from the server
    fetch("http://localhost:8080/auth/customer/getAllFaqs")
      .then((response) => response.json())
      .then((data) => {
        setFaqs(data);
        setFilteredFaqs(data);
      })
      .catch((error) => {
        console.error("Error fetching FAQs:", error);
      });
  }, []);

  useEffect(() => {
    // Filter FAQs based on search query
    const filtered = faqs.filter((faq) =>
      faq.faqType.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFaqs(filtered);
  }, [searchQuery, faqs]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div id="faqs" style={{ backgroundColor: "#ac2358", padding: "40px 0", marginTop: "20px" }}>
      <div className="container">
        <div className="section-title text-center">
          <h2 style={{ color: "#fff", marginBottom: "10px" }}>Frequently Asked Questions</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="search-bar" style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Search FAQs by type"
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
          </div>
        </div>
        <div className="row">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.faqId}
              className="col-md-4"
            >
              <div
                className="faq"
                style={{
                  backgroundColor: "#ac2358",
                  boxShadow: "0 4px 6px rgba(152,20,77,0.5)",
                  color: "#fff",
                  padding: "20px",
                  marginBottom: "20px"
                }}
              >
                <div className="faq-content">
                <p style={{ fontWeight: "bold", fontSize: "15px" }}>{faq.question}</p>
                  <div style={{ fontSize: "15px" }}>{faq.answer}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQComponent;












