import React, { useState, useEffect } from "react";

const LeaveApprove = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("jwtToken");

  // Fetch leave requests from the backend
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/leave-requests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch leave requests.");
        }

        const data = await response.json();
        setLeaveRequests(data);
      } catch (error) {
        setErrorMessage(error.message || "An error occurred while fetching leave requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, [token]);

  // Handle approve action
  const handleApprove = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/leave-requests/${requestId}/approve`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to approve leave request.");
      }

      setLeaveRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
      console.log("Leave request approved.");
    } catch (error) {
      setErrorMessage(error.message || "An error occurred while approving the leave request.");
    }
  };

  // Handle reject action
  const handleReject = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/leave-requests/${requestId}/reject`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to reject leave request.");
      }

      setLeaveRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
      console.log("Leave request rejected.");
    } catch (error) {
      setErrorMessage(error.message || "An error occurred while rejecting the leave request.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Leave Approvals</h2>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      {loading ? (
        <p style={styles.message}>Loading leave requests...</p>
      ) : leaveRequests.length === 0 ? (
        <p style={styles.message}>No leave requests to review.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Employee Name</th>
              <th style={styles.th}>Leave Type</th>
              <th style={styles.th}>Start Date</th>
              <th style={styles.th}>End Date</th>
              <th style={styles.th}>Reason</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td style={styles.td}>{request.employeeName}</td>
                <td style={styles.td}>{request.leaveType}</td>
                <td style={styles.td}>{request.startDate}</td>
                <td style={styles.td}>{request.endDate}</td>
                <td style={styles.td}>{request.reason}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleApprove(request.id)}
                    style={styles.approveButton}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    style={styles.rejectButton}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    width: "100%",
    maxWidth: "800px",
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
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
    backgroundColor: "#2563eb",
    color: "white",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
  },
  approveButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#10b981",
    color: "white",
    fontWeight: "600",
    fontSize: "1rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    marginRight: "10px",
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
  },
};

export default LeaveApprove;