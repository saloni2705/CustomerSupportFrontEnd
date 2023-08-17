import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

//Manager
const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '94vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#ffffff" backgroundColor="#AE275F" breakpoint={720}  >
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Engineer</CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/login/EngineerDashboard/updateComplaints" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Update Complaints</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/login/ManagerDashboard/leaverequests" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Post FAQ's</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/login/ManagerDashboard/editinfo" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Edit Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/login/ManagerDashboard/logout" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">logout</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            
            
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;