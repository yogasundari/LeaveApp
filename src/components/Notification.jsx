import React, { useState } from "react";

const Notification = ({ notificationMessage, onAccept, onReject }) => {
  const [status, setStatus] = useState("");

  const handleAccept = () => {
    setStatus("Accepted");
    if (onAccept) {
      onAccept();
    }
  };

  const handleReject = () => {
    setStatus("Rejected");
    if (onReject) {
      onReject();
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Notification</h3>
      <p style={styles.message}>{notificationMessage}</p>
      <div style={styles.buttonGroup}>
        <button onClick={handleAccept} style={styles.acceptButton}>
          Accept
        </button>
        <button onClick={handleReject} style={styles.rejectButton}>
          Reject
        </button>
      </div>
      {status && <p style={styles.status}>Status: {status}</p>}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1e3a8a",
    marginBottom: "10px",
  },
  message: {
    fontSize: "1rem",
    color: "#374151",
    marginBottom: "20px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  acceptButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#10b981",
    color: "white",
    fontWeight: "600",
    fontSize: "1rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  rejectButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#ef4444",
    color: "white",
    fontWeight: "600",
    fontSize: "1rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  status: {
    marginTop: "20px",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1e3a8a",
  },
};

export default Notification;