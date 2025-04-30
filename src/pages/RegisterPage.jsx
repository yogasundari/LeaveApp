import React from 'react';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <div style={styles.container}>
      <img
        src="/sec.png"
        alt="College Logo"
        style={styles.logo}
      />
      <h2 style={styles.title}>Register an account</h2>
      <RegisterForm />
      <h5 style={styles.footerText}>
        Already have an account?{" "}
        <a href="/login" style={styles.link}>
          Login
        </a>
      </h5>
    </div>
  );
};

// Inline CSS with media query
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    textAlign: 'center',
  },
  logo: {
    width: '60px',
    height: 'auto',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#1e3a8a',
  },
  footerText: {
    marginTop: '1rem',
    fontSize: '1rem',
    color: '#475569',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'underline',
    fontWeight: '500',
  },
  // Media queries manually handled
  '@media (max-width: 640px)': {
    container: {
      padding: '0.5rem',
    },
    logo: {
      width: '45px',
    },
    title: {
      fontSize: '1.5rem',
    },
    footerText: {
      fontSize: '0.9rem',
    },
  }
};

export default RegisterPage;
