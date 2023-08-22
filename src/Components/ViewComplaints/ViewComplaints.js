import React from "react";
import Sidebar from '../Sidebar';
import ComplaintTables from './ComplaintTables';
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import NavbarComplaints from "../NavbarComplaints/NavbarComplaints";

const ViewComplaints = () => {
  return (
      <div>
        <NavbarComplaints />

        {/* Table with padding */}
        <Col lg="10" style={{ display: 'flex', justifyContent: 'center', marginLeft: '100px' }}>
          <ComplaintTables />
        </Col>
      </div>
  );
};

export default ViewComplaints;