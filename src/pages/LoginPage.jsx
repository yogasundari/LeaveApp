import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div style={styles.container}>
      <img
        src="/sec.png"
        alt="College Logo"
        style={styles.logo}
      />

      <div style={styles.formContainer}>
        <LoginForm />
        <h5 style={styles.registerText}>
          Don't have an account?{" "}
          <a href="/register" style={styles.registerLink}>
            Register
          </a>
        </h5>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc', // light background
    padding: '2rem',
  },
  logo: {
    width: '80px',
    height: 'auto',
    marginBottom: '1.5rem',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    backgroundColor: 'white',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.75rem',
    textAlign: 'center',
  },
  registerText: {
    marginTop: '1.5rem',
    fontSize: '0.95rem',
    color: '#64748b', // slate gray
  },
  registerLink: {
    color: '#2563eb', // nice blue
    textDecoration: 'underline',
  },
};

export default LoginPage;
