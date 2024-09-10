// src/services/api.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001', // Backend server URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
