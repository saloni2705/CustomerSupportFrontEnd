import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import user2 from "../../assets/images/users/user2.jpg";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from 'mdb-react-ui-kit';

function UpdateUserPage() {
  const navigate = useNavigate();
  const customerid = localStorage.getItem('customerid');
  const [userProfileData, setUserProfileData] = useState({
    customerid: '',
    name: '',
    email: '',
    phoneNumber: '',
    // Other fields you want to display
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data using GET request
        const response = await fetch(`http://localhost:8080/auth/customer/${customerid}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const fetchedUserData = await response.json();
          // Filter out unwanted fields
          const filteredUserData = {
            customerid: fetchedUserData.customerid,
            name: fetchedUserData.name,
            email: fetchedUserData.email,
            phoneNumber: fetchedUserData.phoneNumber,
            // Other fields you want to display
          };
          setUserProfileData(filteredUserData);
        } else {
          console.error('Error fetching user data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [customerid]);

  const handleUpdateUserInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/auth/customer/UpdateCustomer/${customerid}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfileData),
      });

      if (response.ok) {
        console.log('User details updated successfully!');
        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateSuccess(false);
          navigate('/');
        }, 3000); // Clear success message after 3 seconds
      } else {
        console.error('Error updating user details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol lg="8">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem', backgroundColor: '#fff' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white">
                  <MDBCardImage
                    src={user2}
                    alt="Avatar"
                    className="my-5"
                    style={{ width: '80px' }}
                    fluid
                  />
                  <MDBTypography tag="h5" className="text-dark">
                    {userProfileData.name}
                  </MDBTypography>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBTypography tag="h6">Name</MDBTypography>
                    <input
                      type="text"
                      value={userProfileData.name}
                      onChange={(e) => setUserProfileData({ ...userProfileData, name: e.target.value })}
                      className="form-control mb-3"
                    />
                    <MDBTypography tag="h6">Email</MDBTypography>
                    <input
                      type="text"
                      value={userProfileData.email}
                      onChange={(e) => setUserProfileData({ ...userProfileData, email: e.target.value })}
                      className="form-control mb-3"
                    />
                    <MDBTypography tag="h6">Phone</MDBTypography>
                    <input
                      type="text"
                      value={userProfileData.phoneNumber}
                      onChange={(e) => setUserProfileData({ ...userProfileData, phoneNumber: e.target.value })}
                      className="form-control mb-4"
                    />
                    <button onClick={handleUpdateUserInfo} className="btn btn-primary">
                      Update
                    </button>
                    {updateSuccess && (
                      <div className="mt-3 alert alert-success" role="alert">
                        User details updated successfully!
                      </div>
                    )}
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default UpdateUserPage;



