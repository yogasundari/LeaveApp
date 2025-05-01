import React, { useState } from "react";

const LeaveRequest = () => {
  // Get empId from localStorage
  const empId = localStorage.getItem("empId");

  // State variables
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveType, setLeaveType] = useState("CL");
  const [reason, setReason] = useState("");
  const [hasClass, setHasClass] = useState("no");
  const [alterationMode, setAlterationMode] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [earnedDate, setEarnedDate] = useState("");
  const [medicalFile, setMedicalFile] = useState(null);

  // Additional fields for Moodle Activity and Staff Alteration
  const [classPeriod, setClassPeriod] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [moodleLink, setMoodleLink] = useState("");
  const [alteredFaculty, setAlteredFaculty] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");
  const [isAlterationSubmitted, setIsAlterationSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const leaveRequestData = {
      empId,
      startDate,
      endDate,
      leaveType,
      reason,
      hasClass,
      alterationMode: hasClass === "yes" ? alterationMode : null,
      startTime: leaveType === "Permission" ? startTime : null,
      endTime: leaveType === "Permission" ? endTime : null,
      earnedDate: leaveType === "Compoff" ? earnedDate : null,
      medicalFile: leaveType === "ML" ? medicalFile : null,
      classPeriod: alterationMode ? classPeriod : null,
      subjectCode: alterationMode ? subjectCode : null,
      subjectName: alterationMode ? subjectName : null,
      moodleLink: alterationMode === "Moodle Activity" ? moodleLink : null,
      alteredFaculty: alterationMode === "Staff Alteration" ? alteredFaculty : null,
      notificationStatus: alterationMode === "Staff Alteration" ? notificationStatus : null,
    };

    console.log("Leave Request Data:", leaveRequestData);
    // You can send this data to the backend using fetch or axios
  };

  // Handle notification for Staff Alteration
  const handleSendNotification = () => {
    setNotificationStatus("Notification Sent");
    console.log("Notification sent to:", alteredFaculty);
  };

  // Handle alteration submission
  const handleAlterationSubmit = () => {
    setIsAlterationSubmitted(true);
    console.log("Alteration submitted successfully.");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Leave Request</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Employee ID */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Employee ID:</label>
          <input
            type="text"
            value={empId}
            disabled
            style={styles.input}
          />
        </div>

        {/* Start Date */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {/* End Date */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {/* Leave Type */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Leave Type:</label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
            style={styles.input}
          >
            <option value="CL">Casual Leave (CL)</option>
            <option value="ML">Medical Leave (ML)</option>
            <option value="EL">Earned Leave (EL)</option>
            <option value="Vacation">Vacation</option>
            <option value="Permission">Permission</option>
            <option value="Late">Late</option>
            <option value="RH">Regional Holiday (RH)</option>
            <option value="Compoff">Compensatory Leave</option>
          </select>
        </div>

        {/* Reason */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Reason:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            style={{ ...styles.input, height: "100px" }}
          />
        </div>

        {/* Do you have a class? */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Do you have a class?</label>
          <div>
            <label>
              <input
                type="radio"
                value="yes"
                checked={hasClass === "yes"}
                onChange={(e) => setHasClass(e.target.value)}
              />
              Yes
            </label>
            <label style={{ marginLeft: "20px" }}>
              <input
                type="radio"
                value="no"
                checked={hasClass === "no"}
                onChange={(e) => setHasClass(e.target.value)}
              />
              No
            </label>
          </div>
        </div>

        {/* Alteration Mode */}
        {hasClass === "yes" && (
          <div style={styles.inputGroup}>
            <label style={styles.label}>Alteration Mode:</label>
            <select
              value={alterationMode}
              onChange={(e) => setAlterationMode(e.target.value)}
              required
              style={styles.input}
            >
              <option value="">Select Alteration Mode</option>
              <option value="Moodle Activity">Moodle Activity</option>
              <option value="Staff Alteration">Staff Alteration</option>
            </select>
          </div>
        )}

        {/* Additional Fields for Moodle Activity */}
        {alterationMode === "Moodle Activity" && (
          <>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Class Period:</label>
              <input
                type="text"
                value={classPeriod}
                onChange={(e) => setClassPeriod(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Subject Code:</label>
              <input
                type="text"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Subject Name:</label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Moodle Activity Link:</label>
              <input
                type="url"
                value={moodleLink}
                onChange={(e) => setMoodleLink(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <button
                type="button"
                onClick={handleAlterationSubmit}
                style={styles.button}
              >
                Submit Alteration
              </button>
            </div>
          </>
        )}

        {/* Additional Fields for Staff Alteration */}
        {alterationMode === "Staff Alteration" && (
          <>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Class Period:</label>
              <input
                type="text"
                value={classPeriod}
                onChange={(e) => setClassPeriod(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Subject Code:</label>
              <input
                type="text"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Subject Name:</label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Altered Faculty:</label>
              <input
                type="text"
                value={alteredFaculty}
                onChange={(e) => setAlteredFaculty(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <button
                type="button"
                onClick={handleSendNotification}
                style={styles.button}
              >
                Send Notification
              </button>
              {notificationStatus && (
                <p style={{ color: "green", marginTop: "10px" }}>
                  {notificationStatus}
                </p>
              )}
            </div>
            <div style={styles.inputGroup}>
              <button
                type="button"
                onClick={handleAlterationSubmit}
                style={styles.button}
              >
                Submit Alteration
              </button>
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            ...styles.button,
            backgroundColor: isAlterationSubmitted ? "#2563eb" : "#9ca3af",
            cursor: isAlterationSubmitted ? "pointer" : "not-allowed",
          }}
          disabled={!isAlterationSubmitted}
        >
          Submit Leave Request
        </button>
      </form>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    width: "100%",
    maxWidth: "600px",
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.5rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1e3a8a",
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #cbd5e1",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    outline: "none",
    backgroundColor: "#f8fafc",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: "600",
    fontSize: "1rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default LeaveRequest;