import React, { useState } from 'react';
import { register } from '../services/AuthService';
import { useNavigate } from 'react-router-dom'; // ✅ Add this


const RegisterForm = () => {
  const navigate = useNavigate(); // ✅ Hook for navigation

  const [email, setEmail] = useState('employee@saveetha.ac.in');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('EMPLOYEE');
  const [employeeID, setEmployeeID] = useState('EMPID1234');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registerData = { empId: employeeID, email, password, role };

    try {
      await register(registerData);
      setSuccessMessage('Registration successful! Redirecting to login...');
      setError('');
      setTimeout(() => {
        navigate('/login'); // ✅ Manual redirect after success
      }, 1500);
    } catch (error) {
      console.error('Registration failed', error);
      setError('Registration failed. Please try again.');
      setSuccessMessage('');
    }
  };


  return (
    <form onSubmit={handleSubmit} style={styles.form}>
<div style={styles.inputGroup}>
  <label style={styles.label}>Employee ID:</label>
  <input
    type="text"
    value={employeeID}
    onChange={(e) => setEmployeeID(e.target.value)}
    required
    style={{ 
      ...styles.input, 
      color: '#6c757d', 
      fontWeight: '400' 
    }}
  />
</div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          style={styles.input}
        >
          <option value="EMPLOYEE">Employee</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      <button type="submit" style={styles.button}>Register</button>

      {successMessage && <p style={styles.success}>{successMessage}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </form>
  );
};

const styles = {
  form: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#f9fafb',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  inputGroup: {
    marginBottom: '1.2rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.7rem',
    backgroundColor: '#2563eb',
    color: 'white',
    fontWeight: '600',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  success: {
    marginTop: '1rem',
    color: 'green',
    fontWeight: '500',
  },
  error: {
    marginTop: '1rem',
    color: 'red',
    fontWeight: '500',
  },
};

export default RegisterForm;
