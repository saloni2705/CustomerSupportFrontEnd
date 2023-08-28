import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from 'mdb-react-ui-kit';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
  
    const handleForgotPassword = async () => {
      const endpoint = 'http://localhost:8080/auth/customer/forgot-password';
  
      const formData = new FormData();
      formData.append('email', email); // Add email to form data
  
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData, // Use form data here
        });
  
        if (response.ok) {
          setSuccessMessage('Password reset instructions sent to your email.');
          navigate('/reset-password');
        } else {
          const errorResponse = await response.json();
          setErrorMessage(errorResponse.message);
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };
  
  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
              alt="forgot password form"
              className="card-image rounded-start w-100"
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column card-body">
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Forgot Password
              </h5>
              <MDBInput
                wrapperClass="mb-4"
                label="Email Address"
                id="formControlLg"
                type="email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <MDBBtn
                className="mb-4 px-5"
                style={{ backgroundColor: '#98144d' }}
                size="lg"
                onClick={handleForgotPassword}
              >
                Reset Password
              </MDBBtn>
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default ForgotPasswordPage;