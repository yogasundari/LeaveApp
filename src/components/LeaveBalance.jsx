import React, { useState, useEffect } from "react";

const LeaveBalance = () => {
  const [leaveBalance, setLeaveBalance] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const empId = localStorage.getItem("empId");
  const token = localStorage.getItem("jwtToken");

  // Fetch leave balance from the backend
    // Sample data for testing
    const sampleData = [
        { leaveType: "CL", totalLeaves: 12, usedLeaves: 4, remainingLeaves: 8 },
        { leaveType: "ML", totalLeaves: 10, usedLeaves: 2, remainingLeaves: 8 },
        { leaveType: "EL", totalLeaves: 15, usedLeaves: 5, remainingLeaves: 10 },
        { leaveType: "Vacation", totalLeaves: 20, usedLeaves: 10, remainingLeaves: 10 },
      ];
  useEffect(() => {
    const fetchLeaveBalance = async () => {
      setLoading(true);
      try {
        // const response = await fetch(`http://localhost:8080/api/leave-balance/${empId}`, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });

        // if (!response.ok) {
        //   throw new Error("Failed to fetch leave balance.");
        // }

        // const data = await response.json();
        // setLeaveBalance(data);
        setLeaveBalance(sampleData);
      } catch (error) {
        setErrorMessage(error.message || "An error occurred while fetching leave balance.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveBalance();
  }, [empId, token]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Leave Balance</h2>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      {loading ? (
        <p style={styles.message}>Loading leave balance...</p>
      ) : leaveBalance.length === 0 ? (
        <p style={styles.message}>No leave balance data available.</p>
      ) : (
        <div style={styles.grid}>
          {leaveBalance.map((balance) => (
            <div key={balance.leaveType} style={styles.card}>
              <h3 style={styles.cardTitle}>{balance.leaveType}</h3>
              <p style={styles.cardText}>
                <strong>Total:</strong> {balance.totalLeaves}
              </p>
              <p style={styles.cardText}>
                <strong>Used:</strong> {balance.usedLeaves}
              </p>
              <p style={styles.cardText}>
                <strong>Remaining:</strong> {balance.remainingLeaves}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1e3a8a",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    fontSize: "1rem",
    textAlign: "center",
    marginBottom: "20px",
  },
  message: {
    textAlign: "center",
    fontSize: "1rem",
    color: "#374151",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#2563eb",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "1rem",
    color: "#374151",
    margin: "5px 0",
  },
};

export default LeaveBalance;