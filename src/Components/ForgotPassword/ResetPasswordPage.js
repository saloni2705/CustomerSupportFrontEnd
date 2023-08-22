import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

function ResetPasswordPage() {
  const [tokenValid, setTokenValid] = useState(false);
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const queryToken = new URLSearchParams(location.search).get('token');

  useEffect(() => {
    // Send a request to your backend to verify the token
    const verifyToken = async () => {
      try {
        const response = await fetch(`http://localhost:8080/auth/customer/reset-password?token=${queryToken}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setTokenValid(true);
          setToken(queryToken); // Set the token value from URL
        } else {
          setTokenValid(false);
        }
      } catch (error) {
        console.error('Error occurred:', error);
        setTokenValid(false);
      }
    };

    if (queryToken) {
      verifyToken();
    } else {
      setTokenValid(false);
    }
  }, [queryToken]);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/customer/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        setResetSuccess(true);
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.message);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  if (resetSuccess) {
    navigate('/login');
    return null;
  }

  if (!tokenValid) {
    return <div>Invalid token.</div>;
  }

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
              alt="reset password form"
              className="card-image rounded-start w-100"
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column card-body">
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Reset Password
              </h5>
              <MDBInput
                wrapperClass="mb-4"
                label="Token"
                id="formControlLg"
                type="text"
                size="lg"
                value={token}
                readOnly
              />
              <MDBInput
                wrapperClass="mb-4"
                label="New Password"
                id="formControlLg"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Confirm Password"
                id="formControlLg"
                type="password"
                size="lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                size="lg"
                onClick={handleResetPassword}
              >
                Reset Password
              </MDBBtn>
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

export default ResetPasswordPage;