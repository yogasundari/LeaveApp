import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage'; 
import Notification from './components/Notification'; // Adjust the import path as necessary
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to /home */}
      <Route path="/home/*" element={<HomePage />} /> {/* HomePage includes everything */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/notifications"
          element={
            <Notification
              notificationMessage="You have a new leave request to review."
              onAccept={() => console.log("Accepted!")}
              onReject={() => console.log("Rejected!")}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;