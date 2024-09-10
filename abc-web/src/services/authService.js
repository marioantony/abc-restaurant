// src/services/authService.js
import axios from 'axios';

// Set the base URL for axios
axios.defaults.baseURL = 'http://localhost:5001'; // Adjust the URL as needed

// Login user
export const loginUser = async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password });
    return response.data;
};

// Check if the user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};
