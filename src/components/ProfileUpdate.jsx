import React, { useState } from "react";
import "../css/ProfileUpdatestyle.css";

const ProfileUpdate = () => {
  const [employee, setEmployee] = useState({
    empName: "",
    designation: "",
    staffType: "",
    profilePicture: "",
    approvalFlowId: "",
    joiningDate: "",
    department: "", // Added department field
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [image, setImage] = useState("");

  const empId = localStorage.getItem("empId");
  const token = localStorage.getItem("jwtToken");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setEmployee({
          ...employee,
          profilePicture: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Format date to yyyy-MM-dd if needed
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero
    return `${year}-${month}-${day}`;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (!empId || !token) {
        throw new Error("Authentication details missing. Please log in again.");
      }

      const formattedEmployee = {
        ...employee,
        dateOfJoining: formatDate(employee.dateOfJoining), // Format the date explicitly
      };

      const response = await fetch(`http://localhost:8080/api/employees/update/${empId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedEmployee),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile. Please try again.");
      }

      const textResponse = await response.text();
      setSuccessMessage("Profile updated successfully!");
      console.log("Update Success:", textResponse);
    } catch (error) {
      setErrorMessage(error.message || "An error occurred while updating the profile.");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="profile-update-wrapper">
        <div className="profile-update-card">
          <h2>Update Profile</h2>
          {errorMessage && <div className="message error">{errorMessage}</div>}
          {successMessage && <div className="message success">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
          <div className="profile-pic-container">
            <label htmlFor="imageUpload" className="profile-pic-label">
              <img
                src={image || "/default-avatar.png"}
                alt="Profile"
                className="profile-pic"
              />
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
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
              <label>Date of Joining</label>
              <input
                type="date"
                id="joiningDate"
                name="joiningDate"
                value={employee.dateOfJoining}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Department</label>
              <select
                name="department"
                value={employee.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option value="HR">HR</option>
                <option value="cse">Finance</option>
                <option value="it">Engineering</option>
                <option value="aids">Marketing</option>
                <option value="aiml">Sales</option>
                <option value="ece">Finance</option>
                <option value="">Engineering</option>
                <option value="aids">Marketing</option>
                <option value="aiml">Sales</option>
              </select>
            </div>

            <div>
              <label>Approval Flow ID</label>
              <input
                type="text"
                name="approvalFlowId"
                value={employee.approvalFlowId}
                onChange={handleChange}
                placeholder="Enter approval flow ID"
                disabled={employee.role !== "Admin"}
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