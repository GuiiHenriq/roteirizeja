import axios from 'axios';

// Create a custom instance of axios with default configurations
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to handle authentication
api.interceptors.request.use((config) => {
  // You can add auth token here if needed
  return config;
});

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors here
    return Promise.reject(error);
  }
);

export default api;