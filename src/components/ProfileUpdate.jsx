import React, { useState, useEffect } from "react"; 

const ProfileUpdate = () => {
  // Initializing state variables
  const [employee, setEmployee] = useState({
    empName: "",
    designation: "",
    staffType: "",
    profilePicture: "",
    approvalFlowId: "",
    dateOfJoining: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Get empId and token from localStorage
  const empId = localStorage.getItem("empId");
  const token = localStorage.getItem("jwtToken");

  // Handle input changes for editable fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  // Handle form submission to update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (!empId || !token) {
        throw new Error("Authentication details missing. Please log in again.");
      }

      // Send PUT request to the backend to update the profile
      const response = await fetch(`http://localhost:8080/api/employees/update/${empId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile. Please try again.");
      }
      const textResponse = await response.text(); // Get the raw response as text

      if (!response.ok) {
        throw new Error(textResponse || "Failed to update profile.");
      }
  
      setSuccessMessage(textResponse); // Show raw success message
      console.log("Update Success:", textResponse);

      // Now try to parse it to JSON
      const data = JSON.parse(textResponse);
      setSuccessMessage("Profile updated successfully!");
      console.log("Updated Employee:", data);
    } 
    //catch (error) {
      //setErrorMessage(error.message || "An error occurred while updating the profile.");
   // } 
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          .profile-update-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f3f4f6;
            padding: 20px;
          }

          .profile-update-card {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 600px;
          }

          .profile-update-card h2 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #1f2937;
            text-align: center;
          }

          .profile-update-card label {
            display: block;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #374151;
          }

          .profile-update-card input {
            width: 100%;
            padding: 10px;
            margin-bottom: 16px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
            color: #374151;
            box-sizing: border-box;
          }

          .profile-update-card input:disabled {
            background-color: #f9fafb;
            color: #9ca3af;
          }

          .profile-update-card button {
            width: 100%;
            padding: 12px;
            background-color: #2563eb;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .profile-update-card button:disabled {
            background-color: #9ca3af;
            cursor: not-allowed;
          }

          .profile-update-card button:hover:not(:disabled) {
            background-color: #1d4ed8;
          }

          .message {
            margin-top: 20px;
            font-weight: bold;
            text-align: center;
          }

          .error {
            color: red;
          }

          .success {
            color: green;
          }
        `}
      </style>

      <div className="profile-update-wrapper">
        <div className="profile-update-card">
          <h2>Update Profile</h2>
          {errorMessage && <div className="message error">{errorMessage}</div>}
          {successMessage && <div className="message success">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div>
              <label>Employee Name</label>
              <input
                type="text"
                name="empName"
                value={employee.empName}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label>Designation</label>
              <input
                type="text"
                name="designation"
                value={employee.designation}
                onChange={handleChange}
                placeholder="Enter your designation"
              />
            </div>

            <div>
              <label>Staff Type</label>
              <input
                type="text"
                name="staffType"
                value={employee.staffType}
                onChange={handleChange}
                placeholder="Enter your staff type"
              />
            </div>

            <div>
              <label>Profile Picture URL</label>
              <input
                type="text"
                name="profilePicture"
                value={employee.profilePicture}
                onChange={handleChange}
                placeholder="Enter profile picture URL"
              />
            </div>

            <div>
              <label>Date of Joining</label>
              <input 
                type="date" 
                id="joiningDate" 
                name="dateOfJoining" 
                value={employee.dateOfJoining}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Approval Flow ID</label>
              <input
                type="text"
                name="approvalFlowId"
                value={employee.approvalFlowId}
                onChange={handleChange}
                placeholder="Enter approval flow ID"
                disabled={employee.role !== "Admin"} // Disable for non-Admin users
              />
            </div>

            <div>
              <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
