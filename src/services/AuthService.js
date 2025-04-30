import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/'; // Replace with your backend URL

// Register function
export const register = async (userData) => {
    try {
      // Ensure the request contains the necessary fields
      const response = await axios.post(`${API_URL}register`, {
        empId: userData.empId, // This should not be null or undefined
        email: userData.email, // Ensure email is provided
        password: userData.password, // Ensure password is provided
        role: userData.role // Ensure role is provided
      });
      return response.data;
    } catch (error) {
      // Log the error to check the response
      console.error("Registration Error: ", error.response);
      throw new Error('Registration failed');
    }
  };

// Login function
// AuthService.js

export const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {  // Full URL for the API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();  // Get the error response from the backend
        throw new Error(errorData.message || 'Login failed');  // Customize error message based on response
      }
  
      return await response.json();  // Return the response data (e.g., token, user info)
    } catch (error) {
      console.error('Login error:', error);  // Log the error for debugging
      throw error;  // Re-throw the error to handle it in the component
    }
  };
  
  
