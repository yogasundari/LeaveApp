import React, { useState, useEffect } from "react";
import "../css/ProfileUpdatestyle.css";

const ProfileUpdate = () => {
  const [employee, setEmployee] = useState({
    empName: "",
    designation: "",
    staffType: "",
    profilePicture: "",
    approvalFlowId: "",
    joiningDate: "",
    departmentId: "", // change from department to departmentId for selected value
  });

  const [departments, setDepartments] = useState([]); // State for departments
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const empId = localStorage.getItem("empId");
  const token = localStorage.getItem("jwtToken");

  // Load employee profile and departments
  useEffect(() => {
    const fetchProfileAndDepartments = async () => {
      try {
        // Fetch employee profile
        const response = await fetch(`http://localhost:8080/api/employees/${empId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch profile.");
        const data = await response.json();
        setEmployee({
          empName: data.empName || "",
          designation: data.designation || "",
          staffType: data.staffType || "",
          profilePicture: data.profilePicture || "",
          approvalFlowId: data.approvalFlowId || "",
          joiningDate: formatDate(data.joiningDate),
          departmentId: data.departmentId || "", // Assuming departmentId is part of the employee data
        });
        setImagePreview(data.profilePicture || "");

        // Fetch departments
        const deptResponse = await fetch(`http://localhost:8080/api/departments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!deptResponse.ok) throw new Error("Failed to fetch departments.");
        const deptData = await deptResponse.json();
        console.log(deptData); // Log the department data for debugging
        setDepartments(deptData); // Set the department list in state
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    if (empId && token) fetchProfileAndDepartments();
  }, [empId, token]);

  // Format date for input
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Show image preview
    }
  };

  // Submit profile update and image upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // 1. Update profile details
      const response = await fetch(`http://localhost:8080/api/employees/update/${empId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) throw new Error("Failed to update profile.");

      // 2. Upload image only if selected
      if (selectedImage) {
        const formData = new FormData();
        formData.append("file", selectedImage);

        const imageUploadRes = await fetch(`http://localhost:8080/api/employees/upload-picture/${empId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!imageUploadRes.ok) throw new Error("Image upload failed.");

        const imageUrl = await imageUploadRes.text();
        setImagePreview(imageUrl); // Display uploaded image
        setEmployee((prev) => ({
          ...prev,
          profilePicture: imageUrl,
        }));
      }

      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-update-wrapper">
      <div className="profile-update-card">
        <h2>Update Profile</h2>
        {errorMessage && <div className="message error">{errorMessage}</div>}
        {successMessage && <div className="message success">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          {/* Image Upload Section */}
          <div className="profile-pic-container">
            <label htmlFor="imageUpload" className="profile-pic-label">
              <img
                src={imagePreview || "/default-avatar.png"}
                alt="Profile"
                className="profile-pic"
              />
              <div className="edit-overlay">✎</div>
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageSelect}
              style={{ display: "none" }}
            />
          </div>

          {/* Employee Name */}
          <div>
            <label>Employee Name</label>
            <input
              type="text"
              name="empName"
              value={employee.empName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Designation */}
          <div>
            <label>Designation</label>
            <input
              type="text"
              name="designation"
              value={employee.designation}
              onChange={handleChange}
            />
          </div>

          {/* Staff Type */}
          <div>
            <label>Staff Type</label>
            <input
              type="text"
              name="staffType"
              value={employee.staffType}
              onChange={handleChange}
            />
          </div>

          {/* Date of Joining */}
          <div>
            <label>Date of Joining</label>
            <input
              type="date"
              name="joiningDate"
              value={employee.joiningDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Department Selection */}
          <select
  name="departmentId"
  value={employee.departmentId}
  onChange={handleChange}
  required
>
  <option value="">Select Department</option>
  {departments.map((dept) => (
    <option key={dept.departmentId} value={dept.departmentId}>
      {dept.deptName}
    </option>
  ))}
</select>


          {/* Approval Flow ID */}
          <div>
            <label>Approval Flow ID</label>
            <input
              type="text"
              name="approvalFlowId"
              value={employee.approvalFlowId}
              onChange={handleChange}
              disabled
            />
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
