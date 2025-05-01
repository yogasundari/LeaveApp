import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ProfileUpdate from '../components/ProfileUpdate.jsx'; // Ensure the correct import path
import LeaveRequest from '../components/LeaveRequest.jsx';
import Notification from '../components/Notification.jsx'; // Import Notification component
import LeaveApprove from '../components/LeaveApprove.jsx'; // Import LeaveApprove component
import LeaveBalance from '../components/LeaveBalance.jsx'; // Ensure the correct import path


const HomePage = () => {
  const handleAccept = () => {
    console.log("Notification accepted!");
  };

  const handleReject = () => {
    console.log("Notification rejected!");
  };
  const approvalFlowData = [
    {
      approver: "HOD",
      status: "Approved",
      date: "2025-04-29T10:00:00",
      remarks: "Approved swiftly"
    },
    {
      approver: "Principal",
      status: "Pending"
    },
    {
      approver: "Dean",
      status: "Withdrawn",
      date: "2025-04-30T15:12:00"
    }
  ];
  return (
    <div className="home-page">
      <style>
        {`
          .home-page {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          .header {
            background-color: #2563eb; /* blue */
            color: white;
            padding: 20px;
            text-align: center;
          }

          .dashboard-container {
            display: flex;
            flex: 1;
          }

          .sidebar {
            width: 250px;
            background-color: #1e3a8a; /* dark blue */
            color: white;
            padding: 20px;
          }

          .sidebar a {
            display: block;
            color: white;
            text-decoration: none;
            margin: 10px 0;
            padding: 10px;
            border-radius: 8px;
            transition: background-color 0.3s;
          }

          .sidebar a:hover {
            background-color: #3b82f6; /* lighter blue */
          }

          .content {
            flex: 1;
            padding: 20px;
            background-color: #f9fafb; /* light gray */
          }
        `}
      </style>

      {/* Greeting Header */}
      <header className="header">
        <h1>Welcome</h1>
        <p>Your one-stop solution for managing leave requests and approvals.</p>
      </header>

      {/* Dashboard Layout */}
      <div className="dashboard-container">
        {/* Sidebar */}
        <nav className="sidebar">
          <h2>Dashboard</h2>
          <Link to="/home/profile-update">Update Profile</Link>
          <Link to="/home/leave-request">Leave Request</Link>
          <Link to="/home/approve-requests">Approve Requests</Link>
          <Link to="/home/notification">Notifications</Link> {/* Add link to Notifications */}
          <Link to="/home/leave-balance">Leave Balance</Link>
        </nav>

        {/* Main Content */}
        <div className="content">
          <Routes>
            <Route path="profile-update" element={<ProfileUpdate />} /> {/* ProfileUpdate Component */}
            <Route path="leave-request" element={<LeaveRequest />} />
            <Route path="approve-requests" element={<LeaveApprove/>} />
            <Route path="leave-balance" element={<LeaveBalance />} />
          
            <Route
              path="notification"
              element={
                <Notification
                  notificationMessage="You have a new leave request to review."
                  onAccept={handleAccept}
                  onReject={handleReject}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default HomePage;