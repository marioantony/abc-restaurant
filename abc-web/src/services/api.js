import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = (userData) => {
    return axios.post(`${API_URL}/users/register`, userData);
};
